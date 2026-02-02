import Fastify from 'fastify';
import { jwtPlugin } from './plugins/jwt';
import cookie from './plugins/cookie';
import { authRoutes } from './modules/auth/auth.routes';

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(jwtPlugin);
  app.register(cookie);
  
  app.get('/health', async () => ({ ok: true }));

  app.register(authRoutes, { prefix: '/auth' });

  return app;
}
