import { SET_CURRENT_USER } from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";
export const checkForExpiredToken = () => {
  return dispatch => {
    // Check for token expiration
    const token = localStorage.getItem("token");

    if (token) {
      const currentTimeInSeconds = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // Check token expiration
      if (user.exp >= currentTimeInSeconds) {
        // Set user
        dispatch(setCurrentUser(token));
      } else {
        dispatch(logout());
      }
    }
  };
};
const setCurrentUser = token => {
  let user;
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `jwt ${token}`;
    user = jwt_decode(token);
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    user = null;
  }

  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
export const login = (userData, history) => {
  return async dispatch => {
    try {
      let response = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      let user = await response.data;
      dispatch(setCurrentUser(user.token));
      history.replace("/");
    } catch (err) {
      console.log("An error occurred.", err);
    }
  };
};
export const signup = (userData, history) => {
  console.log(userData);
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );
      //If your backend logs the user in when signing up use the following code
      const user = res.data;

      dispatch(setCurrentUser(user.token));
      //If it doesn't log you in
      dispatch(login(userData, history));
    } catch (err) {
      console.error(err);
    }
  };
};
export const logout = () => setCurrentUser();
