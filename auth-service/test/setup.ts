import { vi } from 'vitest';

// Перебиваем системный env жестко
process.env.PGLITE_DIR = 'memory://'; 
process.env.NODE_ENV = 'test';

// Если твоя БД инициализируется при импорте @/db, 
// можно попробовать подменить путь до того, как другие файлы его подтянут