import { NextFunction, RequestHandler } from "express";
import { redisClient } from "../db/redis";

const WHITELIST_PATHS = ['/users/login', '/users/create'];

export const isAuthenticated: RequestHandler = async (req, res, next: NextFunction) => {
  // Allow User login/create to bypass auth
  if(WHITELIST_PATHS.includes(req.path)) {
    console.log('continuing..');

    next();
  } else {
    const sessionId = req.headers.cookie?.split('=')[1] || '';

    const userSession = await redisClient.hGetAll(sessionId); 

    if (Object.keys(userSession).length === 0) {
      res.status(401).send('Unauthorized User');
    } else {
      next();
    }
  };
}