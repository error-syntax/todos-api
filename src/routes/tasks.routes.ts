import express from 'express';

import * as TasksService from '../services/tasks.service';
import { isAuthenticated } from '../middlewares/authentication';

const tasksRouter = express.Router();

tasksRouter.use(async (req, res, next) => {
  isAuthenticated(req, res, next);

  next();
});

tasksRouter.get('/:listId', async (req, res, next) => {
  try {
    const response = await TasksService.fetchTasksByListId(req.params.listId);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default tasksRouter;