import { Movie } from "../../domains/Home";

export const addFavourite = (data: Movie) => ({
  type: "ADD_FAVOURITE",
  data,
});

export const removeFavourite = (imdbID: string) => ({
  type: "REMOVE_FAVOURITE",
  imdbID,
});
