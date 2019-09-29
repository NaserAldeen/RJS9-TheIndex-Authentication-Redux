import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

const setLoading = () => ({
  type: actionTypes.SET_AUTHOR_LOADING
});

export const fetchAuthorDetail = authorID => {
  return async dispatch => {
    dispatch(setLoading());
    try {
      const res = await instance.get(`/api/authors/${authorID}/`);
      const author = res.data;

      dispatch({
        type: actionTypes.FETCH_AUTHOR_DETAIL,
        payload: author
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const postBook = (book, authorID, closeModal) => {
  book = {
    ...book,
    authors: [authorID]
  };
  return async dispatch => {
    try {
      const res = await instance.post(`/api/books/`, book);
      const newBook = res.data;
      dispatch({
        type: actionTypes.POST_BOOK,
        payload: newBook
      });
      closeModal();
    } catch (error) {
      console.error(error.response.data);
    }
  };
};
