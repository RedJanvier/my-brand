import { connect } from 'mongoose';
import { info as log } from '../helpers';

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    log(`Database Connected: ${conn.connection.host}`);
  } catch (err) {
    log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
