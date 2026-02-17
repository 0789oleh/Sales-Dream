import Fastify from 'fastify';
import { jwtPlugin } from './plugins/jwt';
import cookie from './plugins/cookie';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import { authRoutes } from './modules/auth/auth.routes';
import { AuthError, authErrorMap } from './modules/errors/auth.errors';

export function buildApp() {
  const app = Fastify({
    logger: {
      transport: {
        targets: [
          {
            target: 'pino/file',
            options: { destination: '/app/logs/app.log', mkdir: true },
            level: 'info'
          },
          {
            target: 'pino-pretty', // Чтобы в консоли было красиво
            options: { colorize: true },
          level: 'info'
          }
        ]
      }
    }
  });

  app.register(jwtPlugin);
  app.register(cookie);
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  app.setErrorHandler((error, req, reply) => {
  // Важно: передаем error первым аргументом, чтобы Pino развернул стек
    req.log.error(error, "CRITICAL_ROUTE_ERROR"); 

    if (error instanceof AuthError) {
      const mapped = authErrorMap[error.code];
      return reply.code(mapped.status).send({ message: mapped.message });
    }

    // Для отладки вернем само сообщение об ошибке клиенту (потом уберешь)
    reply.code(500).send({ 
      message: 'Internal server error',
    debug: error.message // <--- временно добавим это
    });
  });

  app.after(() => {
    app.register(authRoutes, { prefix: '/auth' });
  });
  
  app.get('/health', async () => ({ ok: true }));
  app.ready(() => {
  console.log(app.printRoutes());
  });

  return app.withTypeProvider<ZodTypeProvider>();;
}
