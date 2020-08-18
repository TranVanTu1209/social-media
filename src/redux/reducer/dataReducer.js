import * as actionTypes from '../types';

const initialState = {
  screams: [],
  scream: null,
  loading: false,
  error: null
}

const dataReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type)
  {
    case actionTypes.LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case actionTypes.SET_SCREAMS:
      return {
        ...state,
        loading: false,
        screams: payload
      }
    case actionTypes.GET_SCREAM:
      return {
        ...state,
        loading: false,
        scream: payload
      }
    case actionTypes.CLEAR_SCREAM:
      return {
        ...state,
        loading: false,
        scream: null
      }
    case actionTypes.ADD_COMMENT:
      let id = state.screams.findIndex(scream => scream.screamId === payload.screamId);
      state.screams[id].commentsCount++;
      return {
        ...state,
        loading: false,
        scream: {
          ...state.scream,
          comments: [payload, ...state.scream.comments],
          commentsCount: state.scream.commentsCount + 1
        }
      }
    case actionTypes.LIKE_SCREAM:
    case actionTypes.UNLIKE_SCREAM:
      let index = state.screams.findIndex(scream => scream.screamId === payload.screamId);
      state.screams[index] = payload;
      if (state.scream)
      {
        if (state.scream.screamId === payload.screamId)
        {
          state.scream = {
            ...state.scream,
            likesCount: payload.likesCount
          };
        }
      }
      return {
        ...state
      }
    case actionTypes.DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case actionTypes.CREATE_SCREAM:
      return {
        ...state,
        screams: [payload, ...state.screams]
      }
    case actionTypes.DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter(scream => scream.screamId !== payload)
      }
    default: return state;
  }
}

export default dataReducer;