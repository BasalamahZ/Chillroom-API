import passport from "passport";
import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });
        if (!user) {
          return done(null, false, { error: "Invalid e-Mail or password!" });
        }
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
          return done(null, false, { error: "Invalid e-Mail or password!" });
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);