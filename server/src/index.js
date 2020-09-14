import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express, { json } from 'express';
import connectDB from './config/database';
import { info as log } from './helpers';

dotenv.config();
const app = express();
const { PORT } = process.env;
connectDB();

app.use(json());
app.use(cors());
app.use(morgan('dev'));

app.get('/api', (req, res) => res.sendStatus(200));

app.listen(PORT, log(`Server started at http://localhost:${PORT}/api`));
