import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { UserSchema } from "../db/schema/users.schema";

export type User = InferSelectModel<typeof UserSchema>
export type UserCreateInput = InferInsertModel<typeof UserSchema>
export type UserUpdateInput = Partial<Pick<UserCreateInput, 'name' | 'email' | 'password'>>;