import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { it, describe } from 'mocha';
import sendMail, { transporter } from '../helpers/mail';
import logger from '../helpers/logger';

describe('Mail', () => {
  it('send email to provided email of provided type', async () => {
    const sendStub = stub(transporter, 'sendMail');
    const loggerSpy = spy(logger, 'error');
    const infoSpy = spy(logger, 'info');

    sendMail('New Blog post', {
      email: 'test@mail.com',
      title: 'test',
      blogId: 'fakeId',
    });

    expect(sendStub.callCount).to.equal(1);
    expect(sendStub.calledOnce).to.equal(true);
    expect(infoSpy.callCount).to.equal(1);
    expect(infoSpy.calledOnce).to.equal(true);
    expect(loggerSpy.callCount).to.equal(0);
    expect(loggerSpy.calledOnce).to.equal(false);

    infoSpy.restore();
    sendStub.restore();
    loggerSpy.restore();
  });
  it('send email to provided email if no provided type', async () => {
    const sendStub = stub(transporter, 'sendMail');
    const loggerSpy = spy(logger, 'error');
    const infoSpy = spy(logger, 'info');

    sendMail(null, {
      email: 'test@mail.com',
      title: 'test',
      blogId: 'fakeId',
    });

    expect(sendStub.callCount).to.equal(1);
    expect(sendStub.calledOnce).to.equal(true);
    expect(infoSpy.callCount).to.equal(1);
    expect(infoSpy.calledOnce).to.equal(true);
    expect(loggerSpy.callCount).to.equal(0);
    expect(loggerSpy.calledOnce).to.equal(false);

    infoSpy.restore();
    sendStub.restore();
    loggerSpy.restore();
  });
  it('not send email if no provided email', async () => {
    const sendStub = stub(transporter, 'sendMail');
    const loggerSpy = spy(logger, 'error');
    const infoSpy = spy(logger, 'info');

    sendMail(null, null);

    expect(sendStub.callCount).to.equal(0);
    expect(sendStub.calledOnce).to.equal(false);
    expect(infoSpy.callCount).to.equal(0);
    expect(infoSpy.calledOnce).to.equal(false);
    expect(loggerSpy.callCount).to.equal(1);
    expect(loggerSpy.calledOnce).to.equal(true);

    infoSpy.restore();
    sendStub.restore();
    loggerSpy.restore();
  });
});
