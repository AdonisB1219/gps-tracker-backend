import express from 'express';

import {
  errorHandler,
  notFound,
  setupMiddlewares,
} from './middleware/index.js';


import {
  authRouter,
} from './routes/index.js';

// Initializations
const app = express();

// Create admin user if it doesn't exist

// Middlewares
setupMiddlewares(app);

// Router
app.use('/auth', authRouter);


app.use(notFound);
app.use(errorHandler);


export default app;
