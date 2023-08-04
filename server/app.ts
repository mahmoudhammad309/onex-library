import express, { Application, NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { join } from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import environment from './config/environment';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import CustomError from './helpers/errorHandler/CustomError';

const app: Application = express();
const server = createServer(app);

const nodeEnv: string = environment.nodeEnv;

app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router);

if (nodeEnv === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use((err: CustomError, req: Request, res: Response, _: NextFunction) => {
  res.status(err.status ?? 500).json({ msg: err.message });
});

export default server;
