import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../Views/Login";
import SignUp from "../Views/SignUp";
import { FirebaseContext } from "../Firebase";
import DashboardRoutes from "./DashboardRoutes";

const AppRouter = () => {
  const { usuario } = useContext(FirebaseContext);
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoutes
            exact
            path="/login"
            isAuth={usuario}
            component={Login}
          />
          <PublicRoutes
            exact
            path="/signUp"
            isAuth={usuario}
            component={SignUp}
          />
          <PrivateRoutes
            isAuth={usuario}
            path="/"
            component={DashboardRoutes}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
