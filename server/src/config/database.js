import { config } from 'dotenv';
import { connect } from 'mongoose';
import { logger } from '../helpers';

config();

const connectDB = async () => {
  try {
    const { MONGO_URI, MONGO_URI_TEST, NODE_ENV } = process.env;
    const conn = await connect(
      NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    logger.info(
      `Database Connected: ${conn.connection.host} in ${NODE_ENV} mode`
    );
  } catch (err) {
    logger.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
