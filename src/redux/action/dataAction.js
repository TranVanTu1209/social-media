import * as actionTypes from '../types';
import axios from 'axios';

export const getScreams = () => dispatch => {
  dispatch({ type: actionTypes.LOADING_DATA });
  axios.get('/screams')
    .then(res => {
      dispatch({
        type: actionTypes.SET_SCREAMS,
        payload: res.data
      });
    }).catch(err => {
      console.log(err);
    });
}

export const likeScream = (screamId) => dispatch => {
  axios.get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: actionTypes.LIKE_SCREAM,
        payload: res.data
      });
    }).catch(err => {
      console.log(err);
    });
}
export const unlikeScream = (screamId) => dispatch => {
  axios.get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: actionTypes.UNLIKE_SCREAM,
        payload: res.data
      });
    }).catch(err => {
      console.log(err);
    });
}
export const deleteScream = screamId => dispatch => {
  axios.delete(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_SCREAM,
        payload: screamId
      });
      alert(res.data.message);
    }).catch(err => console.log(err));
}

export const createScream = newScream => dispatch => {
  axios.post(`/screams`, newScream)
    .then(res => {
      dispatch({
        type: actionTypes.CREATE_SCREAM,
        payload: res.data
      });
    }).catch(err => console.log(err));
}

export const getScream = screamId => dispatch => {
  dispatch({ type: actionTypes.LOADING_UI });
  axios.get(`/scream/${screamId}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_SCREAM,
        payload: res.data
      });
      dispatch({ type: actionTypes.STOP_LOADING_UI });
    }).catch(err => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    });
}

export const addComment = (screamId, newComment) => dispatch => {
  axios.post(`/scream/${screamId}/comment`, newComment)
    .then(res => {
      dispatch({
        type: actionTypes.ADD_COMMENT,
        payload: res.data
      });
    }).catch(err => console.log(err));
}