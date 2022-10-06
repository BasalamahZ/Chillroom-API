import { DataTypes } from "sequelize";
import db from "../config/dbconfig.js";

const User = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default User;
