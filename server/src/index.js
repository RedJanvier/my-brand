import '@babel/polyfill';
// import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import uploader from 'express-fileupload';
import { serve, setup } from 'swagger-ui-express';
import express, { json, urlencoded } from 'express';
import { errorHandler, logger } from './helpers';
import connectDB from './config/database';
import docs from '../src/docs/index.json';
import routes from './routes';
import {
  jwtStrategy,
  fbStrategy,
  gitStrategy,
  googleStrategy,
} from './config/passport';

dotenv.config();
const app = express();
const { PORT = 4000 } = process.env;
// const whitelist = [
//   'https://redjanvier.netlify.app',
//   'http://127.0.0.1:5500',
//   'http://localhost:5500',
//   'http://localhost:4000',
// ];
connectDB();

// const corsOpts = {
//   origin: (origin, callback) =>
//     whitelist.indexOf(origin) !== -1
//       ? callback(null, true)
//       : callback(new Error('Not allowed by CORS')),
// };
app.use(json());
// app.use(cors(corsOpts));
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
