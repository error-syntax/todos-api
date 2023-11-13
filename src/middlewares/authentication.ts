import { RequestHandler } from "express";
import { redisClient } from "../db/redis";


export const isAuthenticated: RequestHandler = async (req, res) => {
  // Allow User login/create to bypass auth
  if(req.path === '/login' || req.path === '/create') {
    console.log('No Authorization needed...');

    return;
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