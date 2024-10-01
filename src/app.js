import express from 'express';
import cors from 'cors';

import {
  errorHandler,
  notFound,
  setupMiddlewares,
} from './middleware/index.js';


import {
  adminRouter,
  authRouter,
  clientRouter,
  gpsRouter,
  rastreoRouter
} from './routes/index.js';
import { createAdminUser } from './utils/create-admin.js';

// Initializations
const app = express();

app.use(cors())

// Create admin user if it doesn't exist
createAdminUser();

// Middlewares
setupMiddlewares(app);

// Router
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/gps', gpsRouter);
app.use('/rastreo', rastreoRouter);



app.use(notFound);
app.use(errorHandler);


export default app;
