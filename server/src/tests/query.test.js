import { expect } from 'chai';
import request from 'supertest';
import { it, describe, beforeEach, afterEach } from 'mocha';
import { signToken } from '../helpers';
import Query from '../models/Query';
import app from '../index';

describe('api/query', () => {
  beforeEach(async () => {
    await Query.deleteMany({});
  });
  afterEach(async () => {
    await Query.deleteMany({});
  });
  const mockToken = signToken({
    _id: '0',
    name: 'test',
    provider: 'email',
    email: 'test@gmail.com',
  });
  const mocKQuery = {
    name: 'test',
    email: 'test@gmail.com',
    body: 'Lorem ipsum dolor ikit asat almar',
  };

  describe('POST /', () => {
    it('should return create query when the all request body is valid', async () => {
      const res = await request(app).post('/api/query').send(mocKQuery);

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('status', 201);
      expect(res.body.data).to.have.property('name', mocKQuery.name);
      expect(res.body.data).to.have.property('body', mocKQuery.body);
      expect(res.body.data).to.have.property('email', mocKQuery.email);
    });
  });
  describe('GET /', () => {
    it('should return all queries when a valid token is provided', async () => {
      await Query.insertMany([
        mocKQuery,
        { ...mocKQuery, email: 'test1@gmail.com', name: 'test1' },
        { ...mocKQuery, email: 'test2@gmail.com', name: 'test2' },
      ]);
      const res = await request(app)
        .get('/api/query/')
        .set('authorization', `Bearer ${mockToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('status', 200);
      expect(res.body.data).to.have.property('count');
      expect(res.body.data).to.have.property('queries');
      expect(res.body.data.count).to.be.gt(2);
      expect(res.body.data.queries[0]).to.have.keys([
        'email',
        'name',
        'body',
        'createdAt',
        'updatedAt',
        '_id',
        '__v',
      ]);
    });
  });
});
