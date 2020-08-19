import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp.js';
import Navbar from './components/Navbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from './utils/theme';
import AuthRoute from './utils/AuthRoute';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './redux/types';
import * as userActions from './redux/action/userAction';
import store from './redux/store';
import axios from 'axios';
import UserDetail from './pages/UserDetail';
import NullPage from './pages/NullPage';

const token = localStorage.getItem('fbToken');
if (token)
{
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now())
  {
    store.dispatch(userActions.logout());
    window.location.href = '/login';
  } else
  {
    store.dispatch({
      type: actionTypes.SET_AUTHENTICATED
    });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(userActions.getUserData());
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme} >
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:userHandle" component={UserDetail} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={SignUp} />
            <Route path="*" component={NullPage} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}
export default App;
