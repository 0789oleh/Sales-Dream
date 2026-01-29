import { FastifyInstance } from 'fastify';
import { db } from '../../db/index.js';
import { users } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/register', async (req, reply) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const exists = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (exists.length) {
      return reply.code(409).send({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await db
      .insert(users)
      .values({ email, passwordHash })
      .returning();

    const token = app.jwt.sign({ sub: user.id });

    return { accessToken: token };
  });

  app.post('/auth/login', async (req, reply) => {
    const { email, password } = req.body as {
      email: string;
      password: string;
    };

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return reply.code(401).send({ message: 'Invalid credentials' });
    }

    const accessToken = app.jwt.sign({ sub: user.id });

    return { accessToken };
  });

  app.get(
    '/auth/me',
    { preHandler: app.authenticate },
    async (req: any) => {
      const userId = req.user.sub;

      const [user] = await db
        .select({
          id: users.id,
          email: users.email,
          isActive: users.isActive,
        })
        .from(users)
        .where(eq(users.id, userId));

      return user;
  });

}


