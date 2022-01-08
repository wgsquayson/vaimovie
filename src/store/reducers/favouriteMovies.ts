import { Movie } from "../../domains/Home";

const favouriteMovies = (state: Movie[] = [], action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return [
        ...state,
        {
          imdbID: action.data.imdbID,
          Poster: action.data.Poster,
          Title: action.data.Title,
          Type: action.data.Type,
          Year: action.data.Year,
        },
      ];
    case "REMOVE_FAVOURITE":
      const movie = state.findIndex(item => item.imdbID === action.imdbID);

      const updatedFavouriteMovies = state.splice(1, movie);

      state = updatedFavouriteMovies;

      return state;
    default:
      return state;
  }
};

export default favouriteMovies;
