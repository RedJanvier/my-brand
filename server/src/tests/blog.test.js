import path from 'path';
import { expect } from 'chai';
import request from 'supertest';
import { stub } from 'sinon';
import { it, describe, beforeEach, after } from 'mocha';
import Subscriber from '../models/Subscriber';
import uploader from '../config/cloudinary';
import { signToken } from '../helpers';
import Blog from '../models/Blog';
import User from '../models/User';
import app from '..';

describe('/api/blog', () => {
  let mockUser = {};
  let counter = 0;
  const mockBlog = {
    title: 'Hello world',
    image:
      'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
    body: 'lorem ipsum dolor ikiss sanalmman !',
    author: mockUser._id,
  };
  const mockSubscriber = {
    email: 'test@gmail.com',
  };
  let mockToken = `Bearer ${signToken({
    _id: mockUser._id,
    name: 'test',
    provider: 'email',
    email: 'test@gmail.com',
    image:
      'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
  })}`;
  const mockInvalidToken = `Bearer ${signToken({
    _id: 'mockUser._id',
    name: 'test',
    provider: 'google',
    email: 'test@gmail.com',
    image:
      'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png',
  })}`;
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
    await Subscriber.deleteMany({});
  });
  describe('POST /', () => {
    it('should fail to create post when no token provided', async () => {
      const res = await request(app)
        .post('/api/blog')
        .send({ ...mockBlog, author: mockUser._id });
      expect(res).to.have.property('status', 401);
      expect(res.body).to.have.property('status', 401);
      expect(res.body).to.have.property('message', 'No auth token');
    });
    it('should fail to create post when not all fields provided', async () => {
      const imageId = 'newId';
      const image =
        'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png';
      stub(uploader, 'upload').resolves({ url: image, public_id: imageId });

      const res = await request(app)
        .post('/api/blog')
        .set('authorization', mockToken)
        .set('content-type', 'multipart/form-data')
        .attach('image', path.join(__dirname, 'assets/dummy.txt'))
        .field('body', mockBlog.body)
        .field('author', mockUser._id.toString());

      expect(res).to.have.property('status', 400);
      expect(res.body).to.have.property('status', 400);
      expect(res.body).to.have.property('message', '"title" is required');
      expect(res.body).not.to.have.property('data');
      expect(res.body).to.have.property('error');
      expect(res.body.error.path[0]).to.equal('title');
    });
    it('should create post when valid token provided', async () => {
      const res = await request(app)
        .post('/api/blog')
        .set('authorization', mockToken)
        .set('content-type', 'multipart/form-data')
        .attach('image', path.join(__dirname, 'assets/dummy.txt'))
        .field('title', mockBlog.title)
        .field('body', mockBlog.body)
        .field('author', mockUser._id.toString());

      expect(res).to.have.property('status', 201);
      expect(res.body).to.have.property('status', 201);
      expect(res.body).to.have.property('message', 'Blog Created successfully');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('title', mockBlog.title);

      const res2 = await request(app)
        .post('/api/blog')
        .set('authorization', mockToken)
        .set('content-type', 'multipart/form-data')
        .attach('image', path.join(__dirname, 'assets/dummy.txt'))
        .field('title', mockBlog.title)
        .field('body', mockBlog.body)
        .field('author', mockUser._id.toString());

      expect(res2).to.have.property('status', 409);
      expect(res2.body).to.have.property('status', 409);
    });
  });
  describe('PATCH /:blogId', () => {
    it('should not update post when invalid token provided', async () => {
      const blog = await Blog.create({ ...mockBlog, author: mockUser._id });
      await blog.save();

      const res = await request(app)
        .patch(`/api/blog/${blog._id}`)
        .set('authorization', mockInvalidToken)
        .send({ title: 'new' });

      expect(res).to.have.property('status', 500);
      expect(res.body).to.have.property('status', 500);
      expect(res.body).to.have.property('message', 'Forbidden resources!');
      expect(res.body).to.have.property('error');
    });
    it('should update post when valid token provided', async () => {
      const blog = await Blog.create({ ...mockBlog, author: mockUser._id });
      await blog.save();

      const res = await request(app)
        .patch(`/api/blog/${blog._id}`)
        .set('authorization', mockToken)
        .send({ title: 'new' });

      expect(res).to.have.property('status', 200);
      expect(res.body).to.have.property('status', 200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('title', 'new');
    });
  });
  describe('POST /subscribe', () => {
    it('should subscribe to maillist', async () => {
      const blog = await Blog.create({ ...mockBlog, author: mockUser._id });
      await blog.save();

      const res = await request(app)
        .post(`/api/blog/subscribe`)
        .send(mockSubscriber);
      expect(res).to.have.property('status', 201);
      expect(res.body).to.have.property('status', 201);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property(
        'subscriber',
        mockSubscriber.email
      );
    });
  });
  describe('PATCH /:blogId/like', () => {
    it('should add like on post when not a liker but unlike otherwise', async () => {
      const blog = await Blog.create({ ...mockBlog, author: mockUser._id });
      await blog.save();
      const res = await request(app)
        .patch(`/api/blog/${blog._id}/like`)
        .set('authorization', mockToken);
      expect(res).to.have.property('status', 200);
      expect(res.body).to.have.property('status', 200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('title', blog.title);
      expect(res.body.data).to.have.property('likes', 1);
      const res2 = await request(app)
        .patch(`/api/blog/${blog._id}/like`)
        .set('authorization', mockToken);
      expect(res2).to.have.property('status', 200);
      expect(res2.body).to.have.property('status', 200);
      expect(res2.body).to.have.property('data');
      expect(res2.body.data).to.have.property('likes', 0);
    });
  });
  describe('GET /', () => {
    it('should read all posts', async () => {
      const mockBlogs = [
        { ...mockBlog, author: mockUser._id },
        { ...mockBlog, title: 'new', author: mockUser._id },
        { ...mockBlog, title: 'new1', author: mockUser._id },
        { ...mockBlog, title: 'new2', author: mockUser._id },
      ];
      await Blog.insertMany(mockBlogs);

      const res = await request(app).get(`/api/blog`);
      expect(res).to.have.property('status', 200);
      expect(res.body).to.have.property('status', 200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('count', mockBlogs.length);
      expect(res.body.data).to.have.property('blogs');
      expect(res.body.data.blogs[0]).to.have.property('title', mockBlog.title);
    });
  });
  describe('GET /:blogId', () => {
    it('should read single post', async () => {
      const toRead = await Blog.create({ ...mockBlog, author: mockUser._id });
      await toRead.save();
      const res = await request(app).get(`/api/blog/${toRead._id}`);
      expect(res).to.have.property('status', 200);
      expect(res.body).to.have.property('status', 200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('title', toRead.title);
    });
  });
  describe('DELETE /:blogId', () => {
    it('should delete post when valid token provided', async () => {
      const toDelete = await Blog.create({ ...mockBlog, author: mockUser._id });
      await toDelete.save();

      const res = await request(app)
        .delete(`/api/blog/${toDelete._id}`)
        .set('authorization', mockToken);
      expect(res).to.have.property('status', 200);
      expect(res.body).to.have.property('status', 200);
      expect(res.body).to.have.property('message', 'Blog deleted successfully');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('title', toDelete.title);
      const res2 = await request(app)
        .delete(`/api/blog/${toDelete._id}`)
        .set('authorization', mockToken);
      expect(res2).to.have.property('status', 404);
      expect(res2.body).to.have.property('status', 404);
      expect(res2.body).to.have.property('message', 'Blog not found!');
    });
  });
});
