import { Schema, model } from 'mongoose';

const QuerySchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a query sender's email"],
    },
    name: {
      type: String,
      required: [true, "Please provide a query sender's name"],
    },
    body: {
      type: String,
      required: [true, 'Please provide a query body'],
    },
  },
  { timestamps: true }
);

export default model('Query', QuerySchema);
