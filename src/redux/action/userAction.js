import * as actionTypes from '../types';
import axios from 'axios';

export const login = (userData, history) => dispatch => {
  dispatch({
    type: actionTypes.LOADING_UI
  });
  axios.post('/signin', userData)
    .then(res => {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch({
        type: actionTypes.CLEAR_ERRORS
      });
      history.push('/');
    }).catch(err => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    });
}

export const signup = (newUserData, history) => dispatch => {
  dispatch({
    type: actionTypes.LOADING_UI
  });
  axios.post('/signup', newUserData)
    .then(res => {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch({
        type: actionTypes.CLEAR_ERRORS
      });
      history.push('/');
    }).catch(err => {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    });
}

export const logout = () => dispatch => {
  localStorage.removeItem('fbToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: actionTypes.SET_UNAUTHENTICATED
  });
}

export const getUserData = () => dispatch => {
  dispatch({
    type: actionTypes.LOADING_USER
  });
  axios.get('/user')
    .then(res => {
      dispatch({
        type: actionTypes.SET_USER,
        payload: res.data
      });
    }).catch(err => console.log(err));
}

export const setAuthorization = token => {
  const fbToken = `Bearer ${token}`;
  axios.defaults.headers.common['Authorization'] = fbToken;
  localStorage.setItem('fbToken', fbToken);
}

export const uploadProfileImage = (formData) => dispatch => {
  dispatch({
    type: actionTypes.LOADING_USER
  })
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData())
    }).catch(err => console.log(err));
}

export const editUserDetail = userDetail => dispatch => {
  dispatch({
    type: actionTypes.LOADING_USER
  });
  axios.post('/user', userDetail)
    .then(() => {
      dispatch(getUserData());
    }).catch(err => console.log(err));
}