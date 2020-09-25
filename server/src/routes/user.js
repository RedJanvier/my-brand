import { Router } from 'express';
import * as user from '../controllers/user';
import { auth, isAdmin, oAuth, uploadImage } from '../middlewares';

const router = Router();

router.post('/signup', uploadImage, user.signup);
router.post('/profile/:id', auth, isAdmin, user.profile);
router.post('/login', user.login);
router.get('/login/:provider', oAuth.main);
router.get('/login/:provider/callback', oAuth.callback, user.oauthLogin);

export default router;
