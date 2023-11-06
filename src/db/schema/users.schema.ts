import { pgEnum, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { mySchema } from './schema';

export const roleEnum = pgEnum('role', ['super', 'admin', 'standard']);
 
export const UserSchema = mySchema.table(
  'users',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 150}).notNull(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    role: roleEnum('role').default('standard'), 
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  }
);