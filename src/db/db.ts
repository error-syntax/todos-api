import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { envConfig } from '../config';

const pool = new Pool({
    host: "127.0.0.1",
    port: +envConfig.POSTGRES_PORT! || 4500,
    user:  envConfig.POSTGRES_USER || 'apiuser',
    password: envConfig.POSTGRES_PASSWORD || 'qwer9999',
    database: envConfig.POSTGRES_DB || 'todoist',
});

export const db = drizzle(pool);