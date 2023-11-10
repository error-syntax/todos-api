import { NextFunction, RequestHandler } from "express";
import { redisClient } from "../db/redis";

const WHITELIST_PATHS = ['/login', '/create'];

export const isAuthenticated: RequestHandler = async (req, res, next: NextFunction) => {
  // Allow User login/create to bypass auth
  if(WHITELIST_PATHS.includes(req.path)) {
    console.log('No Authorization needed...');

    next();
  } else {
    const sessionId = req.headers.cookie?.split('=')[1] || '';

    const userSession = await redisClient.get(`todoist:${sessionId}`); 

    if (!userSession) {
      res.status(401).send('Unauthorized User');
    } else {
      return userSession;
    }
  };
}