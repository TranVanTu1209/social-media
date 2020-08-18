import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(state => state.user.authenticated);
  if (authenticated)
  {
    return <Redirect to="/" />
  } else
    return <Route
      {...rest}
      render={(props) => authenticated === false ? <Component {...props} /> : <Redirect to="/" />}
    />
}

export default AuthRoute;
