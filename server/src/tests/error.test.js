import { expect } from 'chai';
import { mock } from 'sinon';
import { it, describe } from 'mocha';
import { errorHandler } from '../helpers';

describe('Error Handler', () => {
  it('handles CastError', async () => {
    const nextMock = mock();
    const error = { name: 'CastError' };
    await errorHandler(
      error,
      null,
      { status: () => ({ json: () => {} }) },
      nextMock
    );

    expect(nextMock.callCount).to.equal(1);
    expect(nextMock.calledOnce).to.equal(true);
  });
  it('handles conflicts and ValidationError', async () => {
    const nextMock = mock();
    const error = { code: 11000, message: '"some value"' };
    await errorHandler(
      error,
      null,
      { status: () => ({ json: () => {} }) },
      nextMock
    );

    expect(nextMock.callCount).to.equal(1);
    expect(nextMock.calledOnce).to.equal(true);

    const nextMock2 = mock();
    error.name = 'ValidationError';
    error.errors = [{ message: 'not valid message' }];
    await errorHandler(
      error,
      null,
      { status: () => ({ json: () => {} }) },
      nextMock2
    );

    expect(nextMock2.callCount).to.equal(1);
    expect(nextMock2.calledOnce).to.equal(true);
  });
});
