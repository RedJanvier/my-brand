import { connect } from 'mongoose';
import { logger } from '../helpers';

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    logger.info(`Database Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.info(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
