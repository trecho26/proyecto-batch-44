import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "../Views/Main";
import Navbar from "../Components/Navbar";
import Categorias from "../Views/Categorias";
import { Container } from "@material-ui/core";
import Marcas from "../Views/Marcas";
import Marca from "../Views/Marca";

const DashboardRoutes = () => {
  return (
    <>
      {/* Barra de navegacion */}
      <Navbar />
      <Container maxWidth="lg" className="container">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/categorias/:categoria" component={Categorias} />
          <Route exact path="/marcas/" component={Marcas} />
          <Route exact path="/marcas/:marca" component={Marca} />
        </Switch>
      </Container>
    </>
  );
};

export default DashboardRoutes;
