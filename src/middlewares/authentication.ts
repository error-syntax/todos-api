import { RequestHandler } from "express";
import { redisClient } from "../db/redis";


export const isAuthenticated: RequestHandler = async (req, res, next) => {
  // Allow User login/create to bypass auth
  if(req.path === '/login' || req.path === '/create') {
    next();
  } else {
    const sessionId = req.headers.cookie?.split('=')[1] || '';

    const userSession = await redisClient.get(`todoist:${sessionId}`); 

    if (!userSession) {
      next(new Error('Unauthorized User Session'));
    } else {
      const sessionJSON = JSON.parse(userSession);

      req.session.user = sessionJSON.user;
      req.session.authenticated = sessionJSON.authenticated;

      next();
    }
  };
}