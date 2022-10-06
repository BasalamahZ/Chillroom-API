import axios from "axios";

axios.defaults.baseURL = "https://hapi-books.p.rapidapi.com";
axios.defaults.headers = {
  "X-RapidAPI-Key": process.env.BOOK_API_KEY,
  "X-RapidAPI-Host": "hapi-books.p.rapidapi.com",
};

export const trendingBook = async (req, res) => {
  try {
    const response = await axios.get("/month/2022/8");
    res.json(response.data);
  } catch (err) {
    res.send(err);
  }
};

export const searchBook = async (req, res) => {
  try {
    const search = req.params.name;
    const response = await axios.get(`/search/${search}`);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
};

export const detailBook = async (req, res) => {
  try {
    const book_id = req.params.book_id;
    const response = await axios.get(`/book/${book_id}`);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
};
