import passport from 'passport';
import asyncHandler from './async';

export const auth = asyncHandler(async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) return next(info);
    req.user = user;
    return next();
  })(req, res, next);
});

export const oAuth = {
  main: asyncHandler(async (req, res, next) => {
    const { provider } = req.params;
    const config = { scope: 'email' };
    if (provider === 'github') config.scope = ['user:email'];
    if (provider === 'google') config.scope = ['profile'];

    passport.authenticate(provider, config, (err, user, info) => {
      if (err || !user) return next(info);
      req.user = user;
      console.log('Reached!!!!', user);
      return next();
    })(req, res, next);
  }),
  callback: asyncHandler(async (req, res, next) => {
    const { provider } = req.params;
    passport.authenticate(provider, (err, user) => {
      if (err || !user) return next(err);
      req.user = user;
      return next();
    })(req, res, next);
  }),
};
