import express from 'express';

import { corsConfig, envConfig } from './config';
import userRouter from './routes/users.routes';
import { errorHandler } from './middlewares/errors';
import { appSession } from './middlewares/session';
import authRouter from './routes/auth.routes';
import listRouter from './routes/lists.routes';
import tasksRouter from './routes/tasks.routes';

const port = Number(envConfig.API_PORT) || 5000;
const hostName = envConfig.API_HOSTNAME || 'localhost';
const app = express();

app.use(corsConfig);

// MIDDLEWARE
app.use(express.json());
app.use(appSession);

// ROUTES
app.get('/health', async (req, res) => {
    res.send('It me: 763587000');
});

app.use('/authorize', corsConfig, authRouter);
app.use('/users', corsConfig, userRouter);
app.use('/lists', corsConfig, listRouter);
app.use('/tasks', corsConfig, tasksRouter);

// ERROR HANDLER
app.use(errorHandler);

app.listen(port, hostName, () => {
  console.log(`Server is lit on http://${hostName}:${port}.`);
});
