import { expect } from 'chai';
import request from 'supertest';
import { it, describe, beforeEach, after } from 'mocha';
import { signToken } from '../helpers';
import Blog from '../models/Blog';
import User from '../models/User';
import app from '..';

describe('/api/comment', () => {
  let mockUser = {};
  let counter = 0;
  let mockToken = '';
  const mockBlog = {
    title: 'Hello world',
    image:
      'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
    body: 'lorem ipsum dolor ikiss sanalmman !',
    author: mockUser._id,
  };
  const mockComment = { body: 'Test here' };
  beforeEach(async () => {
    await Blog.deleteMany({});
    mockUser = await User.create({
      name: 'test',
      email: `test${counter}@gmail.com`,
      password: '$2b$12$xSd2pavqxxiSA09bGrENmeLN3Zkl89uJLXhWTS/lZEvXB3UdZ.hja',
    });
    counter += 1;
    await mockUser.save();
    mockToken = `Bearer ${signToken({
      _id: mockUser._id,
      name: 'test',
      provider: 'email',
      email: 'test@gmail.com',
      image:
        'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
    })}`;
  });
  after(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
  });
  describe('POST /:blogId', () => {
    it('should fail to create post when no token provided', async () => {
      const blog = await Blog.create({ ...mockBlog, author: mockUser._id });
      await blog.save();

      const res = await request(app)
        .post(`/api/comment/${blog._id}`)
        .send({ ...mockComment, author: mockUser._id });

      expect(res).to.have.property('status', 401);
      expect(res.body).to.have.property('status', 401);
      expect(res.body).to.have.property('message', 'No auth token');
    });
    it('should create comment on post when valid token provided', async () => {
      const blog = await Blog.create({ ...mockBlog, author: mockUser._id });
      await blog.save();

      const res = await request(app)
        .post(`/api/comment/${blog._id}`)
        .set('authorization', mockToken)
        .send(mockComment);

      expect(res).to.have.property('status', 201);
      expect(res.body).to.have.property('status', 201);
      expect(res.body).to.have.property(
        'message',
        'Successfully commented on post'
      );
      expect(res.body.data).to.have.property('body', mockComment.body);
    });
  });
  describe('DELETE /:blogId', () => {
    it('should delete post when valid token provided', async () => {
      const toDelete = await Blog.create({ ...mockBlog, author: mockUser._id });
      await toDelete.save();

      const res1 = await request(app)
        .post(`/api/comment/${toDelete._id}`)
        .set('authorization', mockToken)
        .send({ ...mockComment });

      const res = await request(app)
        .delete(`/api/comment/${toDelete._id}/${res1.body.data._id}`)
        .set('authorization', mockToken)
        .send({ ...mockComment });

      expect(res).to.have.property('status', 200);
      expect(res.body).to.have.property('status', 200);
      expect(res.body.data).to.have.property('commentsCount', 0);
    });
  });
});
