import { DataTypes } from "sequelize";
import db from "../config/dbconfig.js";

const Post = db.define(
  "posts",
  {
    title: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.ENUM("Film", "Series", "Permainan", "Buku"),
    },
    review: {
      type: DataTypes.TEXT,
    },
    rate: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Post;
