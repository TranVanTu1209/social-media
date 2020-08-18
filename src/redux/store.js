import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducer/userReducer';
import uiReducer from './reducer/uiReducer';
import dataReducer from './reducer/dataReducer';

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
  data: dataReducer
});

const store = createStore(reducers, initialState, compose(applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;