import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticatedUser, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if(authenticatedUser) {
         return <Component {...rest} {...props} authenticatedUser={authenticatedUser} />
        } else {
          return <Redirect to={
            {
              pathname: '/signin',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default PrivateRoute;