/* eslint-disable no-unused-expressions */
import { mock } from 'sinon';
import { expect } from 'chai';
import { it, describe } from 'mocha';
import { cbFunction } from '../config/passport';

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
});
