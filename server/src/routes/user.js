import { Router } from 'express';
import * as user from '../controllers/user';
import { uploadImage } from '../middlewares';

const router = Router();

router.post('/signup', uploadImage, user.signup);
router.post('/profile/:id', user.profile);
router.post('/login', user.login);

export default router;
