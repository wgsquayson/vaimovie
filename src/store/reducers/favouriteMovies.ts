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
      const movieExists = state.find(item => item.imdbID === action.imdbID);

      if (movieExists) {
        const movieIndex = state.indexOf(movieExists);

        state.splice(movieIndex, 1);
      }

      return [...state];
    default:
      return state;
  }
};

export default favouriteMovies;
