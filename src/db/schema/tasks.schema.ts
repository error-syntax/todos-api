import { boolean, date, integer, serial, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";
import { ListSchema } from "./lists.schema";
import { mySchema } from ".";

export const TaskSchema = mySchema.table(
    'tasks',
    {
        id: serial('id').primaryKey(),
        listId: integer('list_id').references(() => ListSchema.id).notNull(),
        content: varchar('content', { length: 255 }).notNull(),
        completed: boolean('completed').default(false).notNull(),
        dueDate: date('due_date'),
        createdAt: timestamp('created_at').defaultNow().notNull(),
        updatedAt: timestamp('updated_at').defaultNow().notNull()
    },
    (taskSchema) => {
        return {
            list_content_unique_idx: uniqueIndex('list_content_unique_idx').on(taskSchema.listId, taskSchema.content),
        }
    }
)