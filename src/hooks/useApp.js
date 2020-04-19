import { useReducer } from "react";
import appReducer from "../reducers/appReducer";
import { USER_LOGGED_IN, USER_LOGGED_OUT, UPDATE_USER } from "../types";

const useApp = () => {
  const initialState = {
    token: null,
    user: null,
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const userLoggedIn = (data) => {
    dispatch({ type: USER_LOGGED_IN, payload: data });
    localStorage.setItem("bugtrackertoken", data.token);
  };

  const userLoggedOut = () => {
    dispatch({ type: USER_LOGGED_OUT });
    localStorage.removeItem("bugtrackertoken");
  };

  const updateUser = (userData) => {
    dispatch({ type: UPDATE_USER, payload: userData });
  };

  return {
    token: state.token,
    user: state.user,
    posts: null,
    userLoggedIn,
    userLoggedOut,
    updateUser,
  };
};

export { useApp };
