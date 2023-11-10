import express from 'express';

import * as UserService from '../services/users.service';
import { UserCreateInput } from '../types';
import { redisClient } from '../db/redis';
import { isAuthenticated } from '../middlewares/authentication';

const userRouter = express.Router();

userRouter.use(isAuthenticated);

userRouter.get('/', async (req, res, next) => {
  try {
    const response = await UserService.getUsers();

    res.send(response);
  } catch (err) {
    next(err)
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const response = await UserService.getUserById(req.params.id);

    res.send({ data: response });
  } catch (err) {
    next(err);
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  const { params: { id } } = req;

  try {
    const response = await UserService.deleteUserById(id);

    res.send(response);
  } catch (err) {
    next(err);
  }
});

userRouter.put('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;

  try {
    const response = await UserService.updateUserById(id, body);

    res.send(response)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/create', async (req, res, next) => {
  const { body: input }: { body: UserCreateInput } = req;

  try {
    const response = await UserService.createUser(input);

    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const response = await UserService.loginUser(req.body);

    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      const {
        id,
        email,
        name,
        role,
      } = response;

      req.session.authenticated = true
      req.session.user = {
        id,
        email,
        name,
        role,
        sid: req.sessionID,
      };

      res.cookie('sid', req.sessionID, { path: '/' });

      await redisClient.hSet(`todoist:${req.sessionID}`, { ...req.session.user });

      res.json(response);
    }
  } catch (err) {
    next(err);
  }
});

export default userRouter;