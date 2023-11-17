import bcrypt from 'bcrypt';

import * as UserApplication from '../application/users.application';
import { UserCreateInput } from '../types';
import { UserLoginInput, UserUpdateInput } from '../types/users.types';
import BadRequestError from '../middlewares/errorHandlers/BadRequestHandler';

export const getUsers = async () => {
    const res = await UserApplication.getUsers();

    return res;
}

export const getUserById = async (userId: number)=> {
    const res = await UserApplication.getUserById(userId);

    return res;
}

export const createUser = async (input: UserCreateInput) => {
    if (!input.email) throw new BadRequestError({ code: 400, message: 'Please provide an email.', logging: true });

    if (!input.name) throw new BadRequestError({ code: 400, message: 'Please provide a name.', logging: true });

    if (!input.password) throw new BadRequestError({ code: 400, message: 'Please provide a password.', logging: true });
    
    input.password = await hashPassword(input.password) ?? input.password;

    const res = await UserApplication.createUser(input);

    return res;
}

export const deleteUserById = async (userId: number) => {
    if (!userId) throw new BadRequestError({ code: 400, message: 'Bad request.', logging: false });

    const res = await UserApplication.deleteUserById(userId);

    return res;
}

export const updateUserById = async (id: string, input: UserUpdateInput) => {
    if (!id) throw new BadRequestError({ code: 400, message: 'Bad request.', logging: false });

    const res = await UserApplication.updateUserById(id, input);

    return res;
}

export const loginUser = async (input: UserLoginInput) => {
    return UserApplication.loginUser(input);
}

function hashPassword(password: string) {
    const saltRounds = 12;
    const hashedPass = bcrypt
        .genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(password, salt);
        })
        .then(hash => {
            return hash;
        })
        .catch(err => console.error(err.message));

    return hashedPass;
}