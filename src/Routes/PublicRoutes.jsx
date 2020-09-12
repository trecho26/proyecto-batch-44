import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoutes = ({ isAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoutes;
