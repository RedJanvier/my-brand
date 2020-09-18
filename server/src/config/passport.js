import { config } from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

config();
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

export default new JwtStrategy(options, (payload, done) => {
  return payload ? done(null, payload) : done({ message: 'unauthenticated' });
});
