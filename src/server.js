import app from './app.js';
import { PORT } from './config/index.js';

export const server = app.listen(PORT, async () => {
  await prisma.$connect();
  console.log('Server is running on port ', PORT);
});
