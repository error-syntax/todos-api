import { integer, pgEnum, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { mySchema } from "./schema";
import { UserSchema } from "./users.schema";

export const themeEnum = pgEnum('theme', ['light', 'dark']);

export const PreferencesSchema = mySchema.table(
  'preferences',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => UserSchema.id).notNull(),
    theme: themeEnum('theme').default('light'), 
    timezone: varchar('timezone', { length: 2 }).notNull().default('US'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
  }
);