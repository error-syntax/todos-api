import  { createClient } from 'redis';
import RedisStore from 'connect-redis';
import { envConfig } from '../config';

// Initialize client.
export let redisClient = createClient({
  password: envConfig.REDIS_PASSWORD
});

redisClient.connect().catch(console.error);

// Initialize store.
export const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'todoist:',
})