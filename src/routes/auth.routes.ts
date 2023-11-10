import express from "express";
import { isAuthenticated } from "../middlewares/authentication";

const authRouter = express.Router();

authRouter.post('/', async (req, res, next) => {
  const response = await isAuthenticated(req, res, next);

  res.send(response);
})


export default authRouter;