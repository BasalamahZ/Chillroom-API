import express, { Router } from "express";
import session from "express-session";
import connectSequilizeSession from "connect-session-sequelize";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import db from "./config/dbconfig.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import bodyParser from "body-parser";
import authRoutes from "./routes/index.js";
import { isUser } from "./middleware/authMiddleware.js";

const app = express();
const port = 5000;

const SequilizeStore = connectSequilizeSession(session.Store);

const store = new SequilizeStore({
  db: db,
});

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
  // await User.drop();
  // await Post.drop();
    // await User.sync()
    // await Post.sync()
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
    store,
  })
);

// passport initialization.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne(
    {
      where: {
        id: id,
      },
    },
    function (err, user) {
      done(err, user);
      console.log(user);
    }
  );
});

app.use(isUser);
app.use(authRoutes);

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
