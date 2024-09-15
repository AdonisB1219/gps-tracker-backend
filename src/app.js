import express from 'express';

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
} from './routes/index.js';
import { createAdminUser } from './utils/create-admin.js';

// Initializations
const app = express();

// Create admin user if it doesn't exist
createAdminUser();

// Middlewares
setupMiddlewares(app);

// Router
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/gps', gpsRouter);


app.use(notFound);
app.use(errorHandler);


export default app;
