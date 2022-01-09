import { combineReducers } from "redux";

import favouriteMovies from "./favouriteMovies";
import users from "./users";

export default combineReducers({
  favouriteMovies,
  users,
});
