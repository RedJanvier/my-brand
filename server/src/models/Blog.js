import { Schema, model } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      unique: [true, 'Please provide another title'],
      required: [true, "Please provide a blog sender's title"],
    },
    body: {
      type: String,
      required: [true, 'Please provide a blog body'],
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/340x230.png?text=no+image',
      required: [true, 'Please provide a blog image!'],
    },
    imageId: {
      type: String,
      required: [true, 'Please provide a blog image!'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: 'RedJanvier',
      required: [true, 'Please provide the blog author!'],
    },
  },
  { timestamps: true }
);

export default model('Blog', BlogSchema);
