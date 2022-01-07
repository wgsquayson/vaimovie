import axios from "axios";
import {X_RAPID_API_KEY} from "@env";

const api = axios.create({
  baseURL: "https://movie-database-imdb-alternative.p.rapidapi.com/",
  headers: {
    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
    "x-rapidapi-key": X_RAPID_API_KEY,
  },
});

export default api;
