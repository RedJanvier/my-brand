import { Router } from 'express';
import { auth } from '../middlewares';
import * as blog from '../controllers/blog';

const router = Router();

router.route('/:blogId').post(auth, blog.addComment);
router.route('/:blogId/:commentId').delete(auth, blog.removeComment);

export default router;
