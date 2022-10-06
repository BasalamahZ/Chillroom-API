import Post from "../models/Post.js";
import MovieDB from "node-themoviedb";

export const createPost = async (req, res) => {
  const mdb = new MovieDB(process.env.MOVIE_API_KEY, 'id-ID');
  try {
    // if (req.body.category === "Film") {
      // const titles = req.query.query;
      // const args = {
      //   query: {
      //     query: titles,
      //   },
      // };
      // const movie = await mdb.search.movies(args);
      // const title = movie.data.results.map(item => {
      //   return {
      //     title: item.original_title
      //   }
      // })
      const post = await Post.create({
        title: req.body.title,
        category: "Film",
        review: req.body.review,
        rate: req.body.rate,
        username: req.session.username,
      });
      res.status(200).json(post);
    // } else {
    //   res.status(400).json("gagal");
    // }
  } catch (error) {
    res.status(500).json(error);
  }
};
