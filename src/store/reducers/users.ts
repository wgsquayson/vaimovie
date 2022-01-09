import { User } from "../actions";

const users = (state: User[] = [], action) => {
  switch (action.type) {
    case "SIGN_IN":
      const userExists = state.find(item => item.id === action.user.id);

      if (userExists) {
        const userIndex = state.indexOf(userExists);

        state[userIndex] = {
          ...userExists,
          signedIn: true,
        };

        return [...state];
      }

      return [
        {
          id: action.user.id,
          name: action.user.name,
          signedIn: true,
          photo: action.user.photo,
        },
        ...state,
      ];
    case "SIGN_OUT":
      const userCheck = state.find(item => item.id === action.userId);

      if (userCheck) {
        const userIndex = state.indexOf(userCheck);

        state[userIndex] = {
          ...userCheck,
          signedIn: false,
        };

        return [...state];
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default users;
