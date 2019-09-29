import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const fetchAuthors = () => {
  return async dispatch => {
    try {
      const res = await instance.get("/api/authors/");
      const authors = res.data;
      dispatch({
        type: actionTypes.FETCH_AUTHORS,
        payload: authors
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const filterAuthors = query => {
  return {
    type: actionTypes.FILTER_AUTHORS,
    payload: query
  };
};

export const postAuthor = (author, closeModal) => {
  return async dispatch => {
    try {
      const res = await instance.post("/api/authors/", author);
      const newAuthor = res.data;
      dispatch({
        type: actionTypes.POST_AUTHOR,
        payload: newAuthor
      });
      closeModal();
    } catch (error) {
      console.error(error.response.data);
    }
  };
};
