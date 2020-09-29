import { expect } from 'chai';
import { mock } from 'sinon';
import request from 'supertest';
import { it, describe, beforeEach, afterEach } from 'mocha';
import User from '../models/User';
import app from '../index';
import { verifyToken, signToken } from '../helpers';
import { oauthLogin } from '../controllers/user';

describe('api/user', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  afterEach(async () => {
    await User.deleteMany({});
  });
  const mockUser = {
    name: 'test',
    email: 'test@gmail.com',
    password: '$2b$12$xSd2pavqxxiSA09bGrENmeLN3Zkl89uJLXhWTS/lZEvXB3UdZ.hja',
  };
  const mockLoginUser = {
    email: 'test@gmail.com',
    password: 'Jannyda1',
  };

  describe('POST /signup', () => {
    it('should return valid token when the all request body is valid', async () => {
      const res = await request(app).post('/api/user/signup').send(mockUser);

      const data = verifyToken(res.body.data);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status', 201);
      expect(res.body).to.have.property('data');
      expect(data).to.have.property('name', mockUser.name);
      expect(data).to.have.property('email', mockUser.email);
      const res2 = await request(app).post('/api/user/signup').send(mockUser);

      expect(res2.status).to.equal(409);
      expect(res2.body).to.have.property('status', 409);
      expect(res2.body).to.have.property('message');
      expect(res2.body).to.have.property('error');
    });
  });
  describe('POST /login', () => {
    it('should validate email & password', async () => {
      const user = await User.create(mockUser);
      await user.save();

      const res = await request(app)
        .post('/api/user/login/')
        .send({ ...mockLoginUser, email: 'null@nibo.haha' });

      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('status', 404);
      expect(res.body).to.have.property('error');

      const res2 = await request(app)
        .post('/api/user/login/')
        .send({ ...mockLoginUser, password: 'nuller' });

      expect(res2.status).to.equal(401);
      expect(res2.body).to.have.property('status', 401);
      expect(res2.body).to.have.property('message', 'Wrong credentials!');
      expect(res2.body).to.have.property('error');
    });
    it('should return valid token when email & password are valid', async () => {
      const user = await User.create(mockUser);
      await user.save();

      const res = await request(app)
        .post('/api/user/login/')
        .send(mockLoginUser);

      const data = verifyToken(res.body.data);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status', 200);
      expect(res.body).to.have.property('data');
      expect(data).to.have.property('name', mockUser.name);
      expect(data).to.have.property('email', mockUser.email);
      expect(data).to.have.property('provider', 'email');
    });
  });
  describe('GET /login/:provider', () => {
    it('should return valid token when supported provider is reached', async () => {
      const user = await User.create(mockUser);
      await user.save();

      const mockProvider = 'facebook';
      const res = await request(app).get(`/api/user/login/${mockProvider}`);

      expect(res.status).to.equal(302);
      expect(res.headers.location.split('.')[1]).to.equal(mockProvider);

      const mockProvider2 = 'google';
      const res2 = await request(app).get(`/api/user/login/${mockProvider2}`);

      expect(res2.status).to.equal(302);
      expect(res2.headers.location.split('.')[1]).to.equal(mockProvider2);
    });
    it('oAuthLogin function', async () => {
      const req = { user: mockUser };
      const res = {
        status: () => ({
          json: () => undefined,
        }),
      };
      const nextMock = mock();

      await oauthLogin(req, res, nextMock);
    });
  });
  describe('POST /profile', () => {
    it('should return valid token when supported provider is reached', async () => {
      const user = await User.create(mockUser);
      await user.save();

      const mockUpdate = { name: 'newnew' };
      const res = await request(app)
        .post(`/api/user/profile/${user._id}`)
        .send(mockUpdate)
        .set(
          'authorization',
          `Bearer ${signToken({ _id: '0', name: 'fake', provider: 'email' })}`
        );

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('name', mockUpdate.name);
    });
  });
});
