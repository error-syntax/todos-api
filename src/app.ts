import express from 'express';

import { corsConfig, envConfig } from './config';
import userRouter from './routes/users.routes';
import { errorHandler } from './middlewares/errors';
import { appSession } from './middlewares/session';
import { isAuthenticated } from './middlewares/authentication';

const port = envConfig.API_PORT || 5000;
const app = express();

app.use(corsConfig);

// MIDDLEWARE
app.use(express.json());
app.use(appSession);
app.use(isAuthenticated);

// ROUTES
app.get('/health', async (req, res) => {
    res.send('It me: 763587000');
});

app.use('/users', corsConfig, userRouter);

// ERROR HANDLER
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is lit on port ${port}.`);
});
