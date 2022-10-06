import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  api_key: process.env.MOVIE_API_KEY,
};

export const trendingMovie = async (req, res) => {
  try {
    const response = await axios.get("/trending/movie/day", {
      params: {
        language: "id-ID",
      },
    });;
    let data = response.data.results.map(item => {
      return {
        id: item.id,
        title: item.title,
        overview: item.overview,
        release_date: item.release_date,
        pupularity: item.popularity,
        rating: item.vote_average,
        photo: item.poster_path,
      };
    });
    res.status(200).json(data);
  } catch (error) {
    res.send(error);
  }
};

export const searchMovie = async (req, res) => {
  try {
    const search = req.query.query;
    const response = await axios.get("/search/movie", {
      params: {
        query: search,
      },
    });
    let data = response.data.results.map(item => {
      return {
        id: item.id,
        title: item.title,
      };
    });
    res.status(200).json(data);
  } catch (error) {
    res.send(error);
  }
};

export const detailMovie = async (req, res) => {
  try {
    const movie_id = req.params.movie_id
    const response = await axios.get(`/movie/${movie_id}`);
    // let data = response.data.results.map(item => {
    //   return {
    //     id: item.id,
    //     title: item.title,
    //     overview: item.overview,
    //     release_date: item.release_date,
    //     pupularity: item.popularity,
    //     rating: item.vote_average,
    //     photo: item.poster_path,
    //   };
    // });
    res.status(200).json(response.data);
  } catch (error) {
    res.send(error);
  }
};
