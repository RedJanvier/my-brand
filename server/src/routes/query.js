import { Router } from 'express';
import * as query from '../controllers/query';
import { auth } from '../middlewares';

const router = Router();

router.route('/').get(auth, query.getAll).post(query.create);

export default router;
