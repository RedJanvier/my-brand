import { expect } from 'chai';
import { mock, spy } from 'sinon';
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
    });
  });
  describe('POST /login', () => {
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
    it.skip('oAuthLogin function', async () => {
      const req = { user: mockUser };
      const res = {
        status: () => ({
          json: () => undefined,
        }),
      };
      const nextMock = mock();
      const tokenSignSpy = spy(signToken);

      await oauthLogin(req, res, nextMock);

      expect(tokenSignSpy.callCount).to.equal(1);
      expect(tokenSignSpy.calledOnce).to.equal(true);
      expect(tokenSignSpy.calledWith(req.user)).to.equal(true);
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
