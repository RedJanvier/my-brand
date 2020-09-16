import { Router } from 'express';
import * as blog from '../controllers/blog';
import { uploadImage } from '../middlewares';

const router = Router();

router.route('/').get(blog.getAll).post(uploadImage, blog.create);
router
  .route('/:blogId')
  .get(blog.getOne)
  .patch(blog.update)
  .delete(blog.deleteOne);

export default router;
