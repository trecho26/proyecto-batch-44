import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const useStyles = makeStyles((theme) => ({
  gridList: {
    maxWidth: "100%",
  },
}));

const Marcas = () => {
  const { setMarca } = useContext(AppContext);
  const classes = useStyles();
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const consulta = async () => {
      try {
        const URL = `https://www.dyna.com.co/api/marcas`;
        const req = await fetch(URL);
        const res = await req.json();
        console.log(res);
        setMarcas(res.results);
      } catch (error) {
        console.log(error);
      }
    };
    consulta();
  }, []);

  return (
    <div>
      <h1>Nuestras marcas</h1>

      <Grid container spacing={2}>
        {marcas.map((marca) => (
          <Grid item xs={6} sm={6} md={3} key={marca.marca}>
            <Link
              to={`/marcas/${marca.marca}`}
              onClick={() => {
                setMarca(marca);
              }}
            >
              <Paper elevation={3}>
                <img
                  className={classes.gridList}
                  src={marca.foto}
                  alt={marca.marca}
                />
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Marcas;
