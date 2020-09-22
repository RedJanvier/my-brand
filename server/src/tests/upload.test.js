/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { stub, mock, spy } from 'sinon';
import { it, describe } from 'mocha';
import uploader from '../config/cloudinary';
import { uploadImage, deleteImage } from '../middlewares';
import Response from '../utils';

describe('Upload', () => {
  describe('Image', () => {
    it('should call next once after upload to cloudinary', async () => {
      const image =
        'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png';
      const req = { files: { image: { tempFilePath: image } } };
      const nextMock = mock();

      const returned = await uploadImage(req, {}, nextMock);

      expect(returned).to.equal(undefined);
      expect(nextMock.callCount).to.equal(1);
    });
    it('should call respond once after delete from cloudinary', async () => {
      const successSpy = spy(Response, 'success');
      const errorSpy = spy(Response, 'error');
      // const callback = mock().returns({ result: 'ok' });
      const imageId = 'newId';
      const destroyer = stub(uploader, 'destroy');
      // .withArgs(imageId, callback);
      destroyer.resolves({ result: 'ok' });

      const returned = await deleteImage({}, imageId);

      expect(returned).to.equal(undefined);
      expect(errorSpy.callCount).to.equal(0);
      expect(successSpy.callCount).to.equal(0);

      destroyer.rejects({ result: 'not ok' });
      const returned2 = await deleteImage(
        { status: () => ({ json: () => {} }) },
        imageId
      );

      expect(returned2).to.equal(undefined);
      expect(errorSpy.callCount).to.equal(1);
      expect(successSpy.callCount).to.equal(0);
      destroyer.restore();
      errorSpy.restore();
      successSpy.restore();
    });
    it('should respond with error on delete failure', async () => {
      const successSpy = spy(Response, 'success');
      const errorSpy = spy(Response, 'error');
      const imageId = 'newId';
      const res = { status: () => ({ json: () => {} }) };
      const returned = await deleteImage(res, imageId);

      expect(returned).to.equal(undefined);
      expect(errorSpy.callCount).to.equal(1);
      expect(successSpy.callCount).to.equal(0);
      expect(errorSpy.calledWith(res, 500, 'Unable to delete image')).to.equal(
        true
      );
      errorSpy.restore();
      successSpy.restore();
    });
  });
});
