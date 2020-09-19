/* eslint-disable default-case */
import { config } from 'dotenv';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';

config();
const {
  BASE_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CONSUMER_KEY,
  GOOGLE_CONSUMER_SECRET,
} = process.env;
const JWToptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
const FBoptions = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  profileFields: ['id', 'emails', 'name', 'displayName', 'picture.type(large)'],
  callbackURL: `${BASE_URL}/user/login/facebook/callback`,
};
const gitOptions = {
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  profileFields: 'user:email',
  callbackURL: `${BASE_URL}/user/login/github/callback`,
};
const googleOptions = {
  clientID: GOOGLE_CONSUMER_KEY,
  clientSecret: GOOGLE_CONSUMER_SECRET,
  callbackURL: `${BASE_URL}/user/login/google/callback`,
};
const cbFunction = async (accessToken, refreshToken, profile, done) => {
  const { photos, provider } = profile;
  const genUser = {
    name: profile._json.name,
    provider,
  };
  try {
    let user = await User.findOne(genUser);
    if (!user) {
      genUser.image = photos[0].value;

      if (!profile._json.email)
        genUser.email = `${profile.displayName}@${provider}.com`;
      else genUser.email = profile._json.email;
      user = await User.create(genUser);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

export const fbStrategy = new FacebookStrategy(FBoptions, cbFunction);
export const gitStrategy = new GitHubStrategy(gitOptions, cbFunction);
export const googleStrategy = new GoogleStrategy(googleOptions, cbFunction);
export const jwtStrategy = new JwtStrategy(JWToptions, (payload, done) => {
  return payload ? done(null, payload) : done({ message: 'unauthenticated' });
});
