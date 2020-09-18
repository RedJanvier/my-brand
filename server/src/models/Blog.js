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
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    commentsCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide the blog author!'],
    },
  },
  { timestamps: true }
);

export default model('Blog', BlogSchema);
