import session from 'express-session';
import { redisStore } from '../db/redis';

const MAX_AGE = 1000 * 60 * 60; // 1 hour

export const appSession = session({
  secret: 'bongo cat',
  resave: false,
  saveUninitialized: false,
  store: redisStore,
  cookie: {
    maxAge: MAX_AGE,
    secure: true,
  }
});

declare module 'express-session' {
  export interface SessionData {
    authenticated: boolean; 
    user: { [key: string]: any };
  }
}