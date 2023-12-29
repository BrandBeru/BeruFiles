import passport from "passport";
import JwtStrategy from "./strategies/jwt.strategy";
passport.use(JwtStrategy)

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});