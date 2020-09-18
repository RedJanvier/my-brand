import { Router } from 'express';
import commentRoutes from './comment';
import queryRoutes from './query';
import blogRoutes from './blog';
import userRoutes from './user';

const router = Router();

router.use('/comment', commentRoutes);
router.use('/query', queryRoutes);
router.use('/blog', blogRoutes);
router.use('/user', userRoutes);

export default router;
