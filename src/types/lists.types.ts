import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { ListSchema } from '../db/schema/lists.schema';

export type List = InferSelectModel<typeof ListSchema>;
export type ListCreateInput = Partial<Pick<InferInsertModel<typeof ListSchema>, 'name' | 'ownerId'>>;
export type ListUpdateInput = Partial<Pick<InferInsertModel<typeof ListSchema>, 'name' | 'id'>>;