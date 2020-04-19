import { USER_LOGGED_IN, USER_LOGGED_OUT, UPDATE_USER } from "../types";

const appReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return userLoggedIn(state, action.payload);
    case USER_LOGGED_OUT:
      return userLoggedOut(state);
    case UPDATE_USER:
      return updateUser(state, action.payload);
    default:
      return state;
  }
};

const userLoggedIn = (state, data) => {
  return {
    ...state,
    token: data.token,
    user: data.user,
  };
};

const userLoggedOut = (state) => {
  return {
    ...state,
    token: null,
    user: null,
  };
};

const updateUser = (state, user) => {
  return {
    ...state,
    user,
  };
};

export { appReducer as default };
