import express from 'express';

import * as UserService from '../services/users.service';
import { UserCreateInput } from '../types';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    const response = await UserService.getUsers();

    res.send(response);
});

userRouter.get('/:id', async (req, res) => {
    const response = await UserService.getUserById(req.params.id);

    res.send({ data: response });
});

userRouter.delete('/:id', async (req, res) => {
    const { params: { id } } = req;

    const response = await UserService.deleteUserById(id);

    if ('err' in response) {
        res.status(500);
    }

    if (response.data?.rowCount! < 1) {
        res.status(404);
    }

    res.send(res.statusCode === 404 ? 'Unable to delete user.' : response);
});

userRouter.put('/:id', async (req, res) => {
    const { params: { id }, body } = req;

    const response = await UserService.updateUserById(id, body);

    console.log(response);

    if ('err' in response) {
        res.status(500);
    }

    res.send(response)
})

userRouter.post('/create', async (req, res) => {
    const { body: input }: { body: UserCreateInput } = req;

    const response = await UserService.createUser(input);

    if ('err' in response) {
        res.status(500);
    }

    res.send(response);
});

export default userRouter;