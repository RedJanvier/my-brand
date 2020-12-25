import '@babel/polyfill';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import uploader from 'express-fileupload';
import { serve, setup } from 'swagger-ui-express';
import express, { json, urlencoded } from 'express';
import { jwtStrategy, fbStrategy, gitStrategy, googleStrategy } from './config/passport';
import { errorHandler, logger } from './helpers';
import connectDB from './config/database';
import docs from '../src/docs/index.json';
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
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);
passport.use(gitStrategy);
passport.use(jwtStrategy);
passport.use(fbStrategy);

app.use('/api', routes);
app.use('/api/docs', serve, setup(docs));
app.use(errorHandler);

app.listen(PORT, logger.info(`Server started at http://localhost:${PORT}/api`));

export default app;
