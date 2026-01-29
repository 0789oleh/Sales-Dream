import fp from 'fastify-plugin';
import cookie from '@fastify/cookie';

export default fp(async (app) => {
  app.register(cookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
});
