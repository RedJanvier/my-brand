import { expect } from 'chai';
import passport from 'passport';
import { mock, spy } from 'sinon';
import { it, describe } from 'mocha';
import { oAuth } from '../middlewares';

describe('Oauth Middlewares: ', () => {
  it('main and callback middlewares', async () => {
    const authSpy = spy(passport, 'authenticate');
    const nextMock = mock();
    const req = { params: { provider: 'facebook' } };

    await oAuth.main(req, {}, nextMock);

    expect(authSpy.callCount).to.equal(1);
    expect(nextMock.callCount).to.equal(1);
    expect(authSpy.calledOnce).to.equal(true);
    expect(authSpy.calledWith('facebook', { scope: 'email' })).to.equal(true);

    const nextMock2 = mock();
    const req2 = { params: { provider: 'github' } };

    await oAuth.callback(req2, {}, nextMock2);

    expect(authSpy.callCount).to.equal(2);
    expect(nextMock2.callCount).to.equal(1);
    expect(authSpy.calledTwice).to.equal(true);
    expect(authSpy.calledWith('github')).to.equal(true);
  });
});
