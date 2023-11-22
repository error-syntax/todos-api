import express from 'express';

import * as TasksService from '../services/tasks.service';
import { isAuthenticated } from '../middlewares/authentication';

const tasksRouter = express.Router();

tasksRouter.use(isAuthenticated);

tasksRouter.get('/:listId', async (req, res, next) => {
  try {
    const data = await TasksService.fetchTasksByListId(req.params.listId);

    res.json({ tasks: data });
  } catch (error) {
    next(error);
  }
});

tasksRouter.post('/create', async (req, res, next) => {
  try {
    const data = await TasksService.createTask(req.body);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

tasksRouter.delete('/:taskId', async (req, res, next) => {
  try {
    const data = await TasksService.deleteTask(req.params.taskId);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

tasksRouter.put('/:taskId/archive', async (req, res, next) => {
  try {
    const data = await TasksService.archiveTask(req.params.taskId);

    res.json(data);
  } catch (error) {
    next(error);
  }
})

tasksRouter.put('/:taskId', async (req, res, next) => {
  try {
    const data = await TasksService.updateTask({...req.body, id: Number(req.params.taskId)});
    
    res.json(data);
  } catch (error) {
    next(error);
  }
})

export default tasksRouter;