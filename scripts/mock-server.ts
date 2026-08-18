import { createMiddleware } from '@mswjs/http-middleware';
import cors from 'cors';
import express from 'express';
import logger from 'pino-http';
import dotenv from 'dotenv';
import { initializeDb } from '@/testing/mocks/db';
import { handlers } from '@/testing/mocks';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.APP_URL, credentials: true }));
app.use(express.json());
app.use(
  logger({
    level: 'info',
    transport: { target: 'pino-pretty', options: { colorize: true, translateTime: true } },
  }),
);
app.use(createMiddleware(...handlers));

initializeDb().then(() => {
  console.log('Mock DB initialized');
  app.listen(process.env.MOCK_API_PORT, () => {
    console.log(`Mock API server started at http://localhost:${process.env.MOCK_API_PORT}`);
  });
});
