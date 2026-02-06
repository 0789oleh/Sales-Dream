declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string;
      email: string;
    };
  }
}