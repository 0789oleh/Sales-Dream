import { NodePgDatabase } from 'drizzle-orm/node-postgres'; // или PgliteDatabase
import { eq } from 'drizzle-orm';


export abstract class BaseRepository<TTable extends any> {
  constructor(
    protected readonly db: any, 
    protected readonly table: TTable
  ) {}
  // Здесь можно добавить общие методы для всех сервисов, например, логирование, обработку ошибок и т.д.
  protected log(message: string) {
    console.log(`[${this.constructor.name}] ${message}`);
  }

    protected handleError(error: Error) {   
    console.error(`[${this.constructor.name}] Error:`, error);
    // Здесь можно добавить общую обработку ошибок, например, отправку в Sentry или другую систему мониторинга
  }
    
  create = async (data: any): Promise<any> => {
  this.log('Creating new record');
  try {
      const result = await this.db.insert(this.table).values(data).returning();
      return result[0]; // Вернуть созданную запись (или нужные поля)
    } catch (error) {
      this.handleError(error);
      throw error; // Пробросить ошибку дальше, если нужно
    }
  };

  async findById(id: string) {
    this.log(`Finding record by ID: ${id}`);
    const results = await this.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id));
    return results[0];
  }
  
  update = async (id: string, data: any): Promise<any> => {
    this.log(`Updating record ID: ${id}`);
    const result = await this.db.update(this.table)
      .set(data)
      .where(eq(this.table.id, id))
      .returning();
    return result[0]; // Вернуть обновленную запись (или нужные поля)
  }

  delete = async (id: string): Promise<void> => {
    this.log(`Deleting record ID: ${id}`);
    const result = await this.db.delete(this.table)
      .where(eq(this.table.id, id));  
  }

}