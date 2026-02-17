import { BaseRepository } from '@core/database/base.repository';
import { user } from '../db/schema';

export class UserRepository extends BaseRepository<typeof user> {

  findByEmail(email: string) {
    return this.db.query.user.findFirst({
      where: eq(user.email, email),
    });
  }

  findActiveById(id: string) {
    return this.db.query.user.findFirst({
      where: and(eq(user.id, id), eq(user.isActive, true)),
    });
  }

  listPaginated(limit = 20, offset = 0) {
    return this.db
      .select()
      .from(user)
      .limit(limit)
      .offset(offset);
  }
}