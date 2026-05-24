import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './configs/db.js';
import UserRouter from './routers/userRouter.js';
import TeacherRouter from './routers/teacherRouter.js';
import teacherPositionsRouter from './routers/teacherPositionsRouter.js';

const CORS_OPTIONS = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:3000',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const CORS = cors(CORS_OPTIONS);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(CORS);
app.use(express.json());

app.use('/users', UserRouter);
app.use('/teachers', TeacherRouter);
app.use('/teacher-positions', teacherPositionsRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});