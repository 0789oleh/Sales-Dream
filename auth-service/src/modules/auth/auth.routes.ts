import fastify, { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service';
import {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
} from './auth.schemas';

export async function authRoutes(app: FastifyInstance) {
  const service = new AuthService(app.jwt);

  app.post(
  '/register',
    {
      schema: {
        body: registerSchema,
        response: {
          200: registerResponseSchema,
        },
      },
    },
  
    async (req, reply) => {
      const user = await service.register(
        req.body.email,
        req.body.password
      );

      return reply.send(user);
    }
  );


  app.post('/login', {
    schema: {
      body: loginSchema,
      response: {
        200: loginResponseSchema,
      },
    },
    handler: async (req) => {
      const { email, password } = req.body;
      
      return service.login(email, password);
    },
  });

  app.get('/me', {
    preHandler: [app.authenticate],
    handler: async (req) => {
      // sub — это id, который мы упаковали в токен
      return await service.getMe(req.user.sub);
    },
  });
}

