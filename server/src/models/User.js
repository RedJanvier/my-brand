import { Schema, model } from 'mongoose';
import { decryptPassword, encryptPassword } from '../helpers';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'email already in use!'],
      required: [true, 'Please provide a user email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a user password'],
    },
    image: {
      type: String,
      default:
        'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
      required: [true, 'Please provide a user image'],
    },
    imageId: String,
    name: {
      type: String,
      unique: [true, 'name already in use!'],
      required: [true, 'Please provide a user name'],
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const hash = await encryptPassword(this.password);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await decryptPassword(password, this.password);
  return compare;
};

export default model('User', UserSchema);
