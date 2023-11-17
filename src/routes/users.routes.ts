import express from 'express';

import * as UserService from '../services/users.service';
import { UserCreateInput } from '../types';
import { redisClient } from '../db/redis';
import { isAuthenticated } from '../middlewares/authentication';

const userRouter = express.Router();

userRouter.use(isAuthenticated);

userRouter.get('/', async (req, res, next) => {
  try {
    const data = await UserService.getUsers();

    res.json(data);
  } catch (err) {
    next(err)
  }
});

userRouter.get('/:id', async (req, res, next) => {
  try {
    const data = await UserService.getUserById(Number(req.params.id));

    res.json(data);
  } catch (err) {
    next(err);
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  try {
    const data = await UserService.deleteUserById(Number(req.params.id));

    res.json(data);
  } catch (err) {
    next(err);
  }
});

userRouter.put('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;

  try {
    const data = await UserService.updateUserById(id, body);

    res.json(data)
  } catch (err) {
    next(err)
  }
})

userRouter.post('/create', async (req, res, next) => {
  const { body: input }: { body: UserCreateInput } = req;

  try {
    const data = await UserService.createUser(input);
    console.log(req.sessionID);

    const {
      id,
      email,
      name,
      role,
    } = data[0];

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

    res.json(data[0]);
  } catch (err) {
    next(err);
  }
});

userRouter.post('/login', async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);

    if (req.session.authenticated) {
      res.json(req.session);
    } else {
      const {
        id,
        email,
        name,
        role,
      } = data;

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

      res.json(data);
    }
  } catch (err) {
    next(err);
  }
});

export default userRouter;