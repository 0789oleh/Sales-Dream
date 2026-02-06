import { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service';
import {
  registerSchema,
  registerResponseSchema,
  loginSchema,
  loginResponseSchema,
} from './auth.schemas';
import * as argon2 from 'argon2';

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
}

