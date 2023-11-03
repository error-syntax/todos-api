import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { ListSchema } from "../db/schema/lists.schema";

export type List = InferSelectModel<typeof ListSchema>;
export type ListCreateInput = InferInsertModel<typeof ListSchema>;