import * as actionTypes from '../types';

const initialState = {
  loading: false,
  errors: null
}

const uiReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type)
  {
    case actionTypes.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case actionTypes.CLEAR_ERRORS: return initialState;
    case actionTypes.LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case actionTypes.STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    default: return state;
  }
}

export default uiReducer;