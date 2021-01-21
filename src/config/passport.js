const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcryptjs");
const models = require("../models");
const JWTStrategy = passportJWT.Strategy;
require("dotenv").config();

function setupPassport(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        const acct = await models.Account.findOne({ where: { email: email } });
        if (acct && (await bcrypt.compare(password, acct.password))) {
          return done(null, acct);
        } else {
          return done(null, false);
        }
      }
    )
  );
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SESSION_SECRET,
      },
      async (jwt_payload, done) => {
        const acct = await models.Account.findOne({
          where: { id: jwt_payload.user._id },
        });
        if (acct.id === jwt_payload.user._id) {
          return done(null, acct);
        } else {
          return done(null, false, {
            message: "Token not matched",
          });
        }
      }
    )
  );
}

module.exports = setupPassport;
