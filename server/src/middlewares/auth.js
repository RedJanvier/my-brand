import passport from 'passport';
import asyncHandler from './async';

const auth = asyncHandler(async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) return next(info);
    req.user = user;
    return next();
  })(req, res, next);
});

export default auth;
