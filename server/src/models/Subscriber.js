import { Schema, model } from 'mongoose';

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already subscribed!'],
      required: [true, 'Please provide an email!'],
    },
  },
  { timestamps: true }
);

export default model('Subscriber', SubscriberSchema);
