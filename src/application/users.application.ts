import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import { db } from '../db/db';
import { UserSchema } from '../db/schema';
import { UserCreateInput } from '../types';
import { UserLoginInput, UserUpdateInput } from '../types/users.types';
import BadRequestError from '../middlewares/errorHandlers/BadRequestHandler';

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

export const loginUser = async (input: UserLoginInput) => {
    let passwordMatch = false;
    const dbUser = await db.query.UserSchema.findFirst({
        where: (users, { eq }) => eq(users.email, input.email.toLowerCase()),
    });

    if (!dbUser) throw new BadRequestError({ code: 404, message: 'Unable to authenticate with the provided email and password.', logging: false });
    
    passwordMatch = await bcrypt.compare(input.password, dbUser?.password);

    if (!passwordMatch) throw new BadRequestError({ code: 404, message: 'Unable to authenticate with the provided email and password.', logging: false });

    const {
        id,
        email,
        name,
        role,
    } = dbUser;

    return { id, email, name, role };
}