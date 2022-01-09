import { Movie } from "../../domains/Home";

export interface User {
  id?: string;
  name?: string;
  photo?: string;
  signedIn?: boolean;
}

export const signIn = (user: User) => ({
  type: "SIGN_IN",
  user,
});

export const signOut = (userId: String) => ({
  type: "SIGN_OUT",
  userId,
});

export const addFavourite = (data: Movie) => ({
  type: "ADD_FAVOURITE",
  data,
});

export const removeFavourite = (imdbID: string) => ({
  type: "REMOVE_FAVOURITE",
  imdbID,
});
