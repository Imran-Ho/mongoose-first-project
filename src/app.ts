import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();
// import { StudentRoutes } from './app/modules/student/student.route';

// parsers
app.use(express.json());
app.use(cors());

// application routes
// app.use('/api/v1', router);
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

// console.log(process.cwd())

// global err function
app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
