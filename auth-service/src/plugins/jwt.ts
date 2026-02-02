import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export const jwtPlugin = fp(async (app) => {
  app.register(jwt, {
    secret: process.env.JWT_SECRET ?? 'dev-secret',
    sign: { expiresIn: '1d' },
  });

  app.decorate(
    'authenticate',
    async (req, reply) => {
      try {
        await req.jwtVerify();
      } catch {
        reply.code(401).send({ message: 'Unauthorized' });
      }
    }
  );
});
