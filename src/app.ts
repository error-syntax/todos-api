import express from 'express';

import { corsConfig, envConfig } from './config';
import userRouter from './routes/users.routes';

const port = envConfig.API_PORT || 5000;
const app = express();

app.use(corsConfig);
app.use(express.json());

// Insert routes here...
app.get('/health', async (req, res) => {
    res.send('It me: 763587000');
});

app.use('/users', corsConfig, userRouter);

app.listen(port, () => {
  console.log(`Server is lit on port ${port}.`);
});
