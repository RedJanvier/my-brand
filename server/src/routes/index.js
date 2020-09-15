import { Router } from 'express';
import queryRoutes from './query';
// import blogRoutes from './blog';

const router = Router();

router.use('/query', queryRoutes);
// router.use('/blog', blogRoutes);

export default router;
