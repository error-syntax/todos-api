import express from "express";

import * as ListsService from '../services/lists.service';
import { isAuthenticated } from "../middlewares/authentication";

const listRouter = express.Router();

listRouter.use(isAuthenticated);

listRouter.get('/:user_id', async (req, res, next) => {
  try {
    const response = await ListsService.fetchListByUserId(req.params.user_id);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

listRouter.post('/create', async (req, res, next) => {
  try {
    const response = await ListsService.createList(req.body);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

export default listRouter;