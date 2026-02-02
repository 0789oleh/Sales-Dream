import { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service';
import { registerSchema, registerResponseSchema } from './auth.schemas';
import { createHash } from 'crypto';
import { zodToJsonSchema } from 'zod-to-json-schema';

export async function authRoutes(app: FastifyInstance) {
  const authService = new AuthService();

    app.post(
    '/register',
    {
      schema: {
        body: zodToJsonSchema(registerSchema),
        response: {
          201: zodToJsonSchema(registerResponseSchema),
        },
      },
    },
    async (req, reply) => {
      const { email, password } = req.body;

      const passwordHash = createHash('sha256')
        .update(password)
        .digest('hex');

      try {
        const user = await authService.register(email, passwordHash);
        return reply.code(201).send(user);
      } catch (e) {
        if ((e as Error).message === 'USER_ALREADY_EXISTS') {
          return reply.code(409).send({
            message: 'User already exists',
          });
        }
        throw e;
      }
    });
}

