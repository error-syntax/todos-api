import { eq } from "drizzle-orm";
import { db } from "../db/db";
import { UserSchema } from "../db/schema/users.schema";
import { UserCreateInput } from "../types";
import { UserUpdateInput } from "../types/users.types";

export const getUsers = async () => {
    try {
        const data = await db.select().from(UserSchema);

        return { data };
    } catch (err) {
        return { err };
    }
}

export const getUserById = async (id: string) => {
    try {
        const data = await db.select().from(UserSchema).where(eq(UserSchema.id, Number(id)));

        return { data };
    } catch (err) {
        return { err };
    }
}

export const createUser = async (input: UserCreateInput) => {
    const { email, name, password } = input;

    try {
        const data = await db
            .insert(UserSchema)
            .values({
                email,
                password,
                name,
            })
            .returning({
                id: UserSchema.id,
                name: UserSchema.name,
                email: UserSchema.email,
                role: UserSchema.role,
            }); 

        return { data };
    } catch (err) {
       return { err }; 
    }
}

export const deleteUserById = async (id: string) => {
    try {
        const data = await db
            .delete(UserSchema)
            .where(eq(UserSchema.id, Number(id)));
        
        return { data };
    } catch(err) {
        return { err };
    }
}

export const updateUserById = async (id: string, input: UserUpdateInput) => {
    try {
        const dbUser = await db.select().from(UserSchema).where(eq(UserSchema.id, Number(id)));

        if (dbUser.length !== 1) {
            return { err: 'Unable to update the user' };
        }

        const data = await db.update(UserSchema).set(input).where(eq(UserSchema.id, Number(id)));

        return { data };
    } catch (err) {
        return { err };
    }
}