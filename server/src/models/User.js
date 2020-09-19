import { Schema, model } from 'mongoose';
import { decryptPassword } from '../helpers';

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
    },
  },
  { timestamps: true }
);

UserSchema.methods.isValidPassword = async (password) => {
  const compare = await decryptPassword(password, this.password);
  return compare;
};

export default model('User', UserSchema);
