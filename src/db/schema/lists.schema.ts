import { boolean, integer, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

import { UserSchema } from './users.schema';
import { mySchema } from './schema';

export const ListSchema = mySchema.table(
  'lists',
  {
    id: serial('id').primaryKey(),
    archived: boolean('archived').default(false).notNull(),
    name: varchar('name', { length: 150 }).unique().notNull(),
    ownerId: integer('owner_id').references(() => UserSchema.id).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  }
)