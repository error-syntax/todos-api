import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import pg from 'pg';

import { envConfig } from '../src/config';

(async function () {
  console.log('Starting Migrations...');
  try {
    const dbConn = new pg.Client({
      database: envConfig.POSTGRES_DB || 'todoist',
      host: '127.0.0.1',
      port: +envConfig.POSTGRES_PORT! || 4500,
      user: envConfig.POSTGRES_USER || 'apiuser',
      password: envConfig.POSTGRES_PASSWORD || 'qwer9999',
    });

    const dbMigrator = drizzle(dbConn, { logger: true });

    await migrate(dbMigrator, { migrationsFolder: path.resolve('.drizzle', 'migrations') });

    console.log('Migration Successful!');

    process.exit(0);
  } catch (error) {
    console.log('Migration Error', error)
    process.exit(0);
  }
})();
