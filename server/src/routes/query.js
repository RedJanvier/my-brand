import { Router } from 'express';
import * as query from '../controllers/query';
import { auth, isAdmin } from '../middlewares';

const router = Router();

router.route('/').get(auth, isAdmin, query.getAll).post(query.create);

export default router;
