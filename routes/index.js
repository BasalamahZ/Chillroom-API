import { Router } from "express";
import { refreshToken } from "../middleware/refreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";
import * as authController from "../controllers/auth.js";
import * as postController from "../controllers/post.js";
import * as movieController from "../controllers/movie.js";
import * as gameController from "../controllers/game.js";
import * as bookController from "../controllers/book.js";
import {
  ValidateRegisterEmail,
  validateLoginEmail,
  validatePassword,
  validateConfirmPassword,
} from "../middleware/validation.js";

const router = Router();
router.get("/user", authController.getUsers);
router.post(
  "/signup",
  [ValidateRegisterEmail, validatePassword, validateConfirmPassword],
  authController.signup
);
router.post(
  "/login",
  [validateLoginEmail, validatePassword],
  authController.login
);
router.get("/logout", authController.Logout);
router.get("/movies/trending", movieController.trendingMovie);
router.get("/movies/search", movieController.searchMovie);
router.get("/movies/:movie_id", movieController.detailMovie);
router.get("/books/trending", bookController.trendingBook);
router.get("/books/search/:query", bookController.searchBook);
router.get("/books/:book_id", bookController.detailBook);
router.get("/games", gameController.games);
router.post("/posts", postController.createPost);

export default router;
