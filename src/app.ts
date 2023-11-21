import express, { Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student.route';
const app = express();

//Parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1/students', studentRoutes);
app.use('api/v1/students', studentRoutes);
app.use('api/v1/students/:studentId', studentRoutes);
app.use('api/v1/students/:studentId', studentRoutes);
app.use('api/va/students/', studentRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.send(a);
});

export default app;
