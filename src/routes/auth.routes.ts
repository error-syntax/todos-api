import express from "express";
import { isAuthenticated } from "../middlewares/authentication";

const authRouter = express.Router();

authRouter.post('/', async (req, res, next) => {
  try {
    await isAuthenticated(req, res, next);

    res.send({ authenticated: req.session.authenticated, user: req.session.user });
  } catch (err) {
    next(err);
  }
})


export default authRouter;