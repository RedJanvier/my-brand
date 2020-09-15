import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express, { json } from 'express';
import connectDB from './config/database';
import { errorHandler, logger } from './helpers';
import routes from './routes';

dotenv.config();
const app = express();
const { PORT } = process.env;
connectDB();

app.use(json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, logger.info(`Server started at http://localhost:${PORT}/api`));
