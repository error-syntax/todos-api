import bcrypt from 'bcrypt';

import * as UserApplication from '../application/users.application';
import { UserCreateInput } from '../types';
import { UserUpdateInput } from '../types/users.types';

export const getUsers = async () => {
    const res = await UserApplication.getUsers();

    return res;
}

export const getUserById = async (id: string) => {
    const res = await UserApplication.getUserById(id);

    return res;
}

export const createUser = async (input: UserCreateInput) => {
    input.password = await hashPassword(input.password) ?? input.password;

    const res = await UserApplication.createUser(input);

    return res;
}

export const deleteUserById = async (id: string) => {
    const res = await UserApplication.deleteUserById(id);

    return res;
}

export const updateUserById = async (id: string, input: UserUpdateInput) => {
    const res = await UserApplication.updateUserById(id, input);

    return res;
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