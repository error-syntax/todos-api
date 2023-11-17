import express from 'express';
import { isAuthenticated } from '../middlewares/authentication';

const authRouter = express.Router();

authRouter.post('/', isAuthenticated, async (req, res, next) => {
  try {
    res.json({ authenticated: req.session.authenticated, user: req.session.user });
  } catch (err) {
    next(err);
  }
})


export default authRouter;