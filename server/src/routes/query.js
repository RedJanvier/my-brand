import { Router } from 'express';
import * as query from '../controllers/query';

const router = Router();

router.route('/').get(query.getAll).post(query.create);

export default router;
