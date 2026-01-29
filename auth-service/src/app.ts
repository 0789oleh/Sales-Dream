import Fastify from 'fastify';
import jwt from './plugins/jwt';
import cookie from './plugins/cookie';
import { authRoutes } from './modules/auth/auth.routes';

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(jwt);
  app.register(cookie);
  app.register(authRoutes);
  app.decorate(
  'authenticate',
  async (req: any, reply: any) => {
    try {
      await req.jwtVerify();
    } catch {
      reply.code(401).send({ message: 'Unauthorized' });
    }
  }
);


  return app;
}
