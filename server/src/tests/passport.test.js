/* eslint-disable no-unused-expressions */
import { mock, spy, stub } from 'sinon';
import { expect } from 'chai';
import { it, describe } from 'mocha';
import connectDB from '../config/database';
import { cbFunction } from '../config/passport';
import { logger } from '../helpers';

describe('Passport', () => {
  it('should call done once after find or create user', async () => {
    const doneMock = mock();
    const mockUser = {
      _json: { name: 'test', email: 'fake' },
      provider: 'google',
      photos: [{ value: 'some foto' }],
      displayName: 'test',
      _id: 'fakeId',
    };

    const returned = await cbFunction(null, null, mockUser, doneMock);

    expect(returned).to.equal(undefined);
    expect(doneMock.callCount).to.equal(1);
    expect(doneMock.calledOnce).to.be.true;
  });
  it('should call done once after find or create user (generate email)', async () => {
    const doneMock = mock();
    const mockUser = {
      _json: { name: 'test' },
      provider: 'google',
      photos: [{ value: 'some foto' }],
      displayName: 'test',
      _id: 'fakeId',
    };

    const returned = await cbFunction(null, null, mockUser, doneMock);

    expect(returned).to.equal(undefined);
    expect(doneMock.callCount).to.equal(1);
    expect(doneMock.calledOnce).to.be.true;
  });
});
describe('Database', () => {
  it('should log error on connection fail', async () => {
    const envStub = stub(process.env, 'NODE_ENV').value('fake');
    const connectStub = stub(process.env, 'MONGO_URI').value('fake');
    const errorLogSpy = spy(logger, 'error');

    const returned = await connectDB();

    expect(returned).to.equal(undefined);
    expect(errorLogSpy.callCount).to.equal(1);

    envStub.restore();
    errorLogSpy.restore();
    connectStub.restore();
  });
});
