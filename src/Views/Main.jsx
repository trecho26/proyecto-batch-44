import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import ProductoCard from "../Components/ProductoCard";
import { FirebaseContext } from "../Firebase";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles({
  titulo: {
    margin: "20px 0px",
    textAlign: "center",
  },
  subtitulo: {
    margin: "15px 0px",
  },
});

const Main = () => {
  const classes = useStyles();
  const { usuario } = useContext(FirebaseContext);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const consulta = async () => {
      try {
        const URL = `https://www.dyna.com.co/api/productos`;
        const req = await fetch(URL);
        const res = await req.json();

        setProductos(res.results);
      } catch (error) {
        console.log(error);
      }
    };
    consulta();
  }, []);

  return (
    <main>
      <Typography className={classes.titulo} variant="h4" component="h1">
        Hola, {usuario.displayName}, bienvenido a tu catálogo.
      </Typography>
      <Divider variant="middle" />
      <Typography className={classes.subtitulo} variant="h6" component="h3">
        Productos principales
      </Typography>
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grow in={true} key={producto.codigo}>
            <Grid item xs={12} sm={12} md={6} lg={3}>
              <ProductoCard producto={producto} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </main>
  );
};

export default Main;
