import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import uploader from 'express-fileupload';
import express, { json, urlencoded } from 'express';
import { errorHandler, logger } from './helpers';
import connectDB from './config/database';
import routes from './routes';

dotenv.config();
const app = express();
const { PORT } = process.env;
connectDB();

app.use(json());
app.use(cors());
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }));
app.use(uploader({ useTempFiles: true }));

app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, logger.info(`Server started at http://localhost:${PORT}/api`));
