import express from 'express';

import * as ListsService from '../services/lists.service';
import { isAuthenticated } from '../middlewares/authentication';

const listRouter = express.Router();

listRouter.use(isAuthenticated);

listRouter.get('/:user_id', async (req, res, next) => {
  try {
    const data = await ListsService.fetchListByUserId(Number(req.params.user_id));

    res.json(data);
  } catch (error) {
    next(error);
  }
});

listRouter.post('/create', async (req, res, next) => {
  try {
    const data = await ListsService.createList(req.body);

    res.json(data);
  } catch (error) {
    next(error);
  }
});

listRouter.delete('/', async (req, res, next) => {
  try {
    const data = await ListsService.deleteLists(req.body.listIds);

    res.json(data);
  } catch (error) {
    next(error);
  }
});


listRouter.put('/', async (req, res, next) => {
  try {
    const data = await ListsService.updateList(req.body);

    res.json(data);
  } catch (error) {
    next(error);
  }
})

export default listRouter;