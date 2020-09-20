import { Router } from 'express';
import * as blog from '../controllers/blog';
import { auth, isAdmin, uploadImage } from '../middlewares';

const router = Router();

router
  .route('/')
  .get(blog.getAll)
  .post(auth, isAdmin, uploadImage, blog.create);
router.route('/subscribe').post(blog.Subscribe);
router
  .route('/:blogId')
  .get(blog.getOne)
  .patch(auth, isAdmin, blog.update)
  .delete(auth, isAdmin, blog.deleteOne);
router.route('/:blogId/like').patch(auth, blog.like);

export default router;
