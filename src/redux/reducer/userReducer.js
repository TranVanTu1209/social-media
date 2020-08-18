import * as actionTypes from '../types';

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false
}

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type)
  {
    case actionTypes.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case actionTypes.SET_UNAUTHENTICATED:
      return initialState;
    case actionTypes.SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...payload
      };
    case actionTypes.LOADING_USER:
      return {
        ...state,
        loading: true
      }
    case actionTypes.LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            screamId: payload.screamId,
            userHandle: state.credentials.handle
          }
        ]
      }
    case actionTypes.UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(like => like.screamId !== payload.screamId)
      }
    default: return state;
  }
}
export default userReducer;