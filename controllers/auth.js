import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import passport from "passport";
import User from "../models/User.js";
import "../config/passport.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      message: "success",
      data: users
    });
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).send(errors.array()[0].msg);
    }
    const hashPassword = await bcrypt.hash(password, 12);
    if (hashPassword) {
      const user = await User.create({
        name: name,
        email: email,
        username: username,
        password: hashPassword,
      });
      return res.status(200).send({
        status: true,
        message: "User registered successfully!",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).send(errors.array()[0].msg);
    } else {
      passport.authenticate("local", async (error, user, info) => {
        if (error) {
          res.status(401).send(error);
        } else if (!user) {
          res.status(401).send(info);
        } else {
          const accessToken = jwt.sign(
            {
              userId: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15s" }
          );
          const refreshToken = jwt.sign(
            {
              userId: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
          );
          await User.update(
            { refresh_token: refreshToken },
            {
              where: {
                id: user.id,
              },
            }
          );
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true (kalo udh dideploy)
          });
          res.status(200).send({
            status: true,
            message: "Logged in successfully!",
            data: { accessToken: accessToken },
          });
        }
      })(req, res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/') // will always fire after session is destroyed
  })
}