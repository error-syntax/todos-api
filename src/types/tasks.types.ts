import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { TaskSchema } from '../db/schema/tasks.schema';

export type Task = InferSelectModel<typeof TaskSchema>;
export type TaskCreateInput = InferInsertModel<typeof TaskSchema>;
export type TaskUpdateInput = Omit<TaskCreateInput, 'createdAt'>;