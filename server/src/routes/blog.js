import { Router } from 'express';
import * as blog from '../controllers/blog';
import { auth, uploadImage } from '../middlewares';

const router = Router();

router.route('/').get(blog.getAll).post(auth, uploadImage, blog.create);
router.route('/subscribe').post(blog.Subscribe);
router
  .route('/:blogId')
  .get(blog.getOne)
  .patch(auth, blog.update)
  .delete(auth, blog.deleteOne);
router.route('/:blogId/like').patch(auth, blog.like);

export default router;
