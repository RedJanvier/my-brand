import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already in use!'],
      required: [true, 'Please provide an email!'],
    },
    password: String,
    image: {
      type: String,
      default:
        'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
    },
    imageId: String,
    provider: {
      type: String,
      default: 'email',
      required: [true, 'Please provide a user provider'],
    },
    name: {
      type: String,
      required: [true, 'Please provide a user name'],
      unique: false,
    },
  },
  { timestamps: true }
);

export default model('User', UserSchema);
