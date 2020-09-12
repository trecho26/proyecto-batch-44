import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";
import ProductoCard from "../Components/ProductoCard";
import { AppContext } from "../Context/AppContext";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  contenedorPrincipal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  img: {
    width: "200px",
  },
  acciones: {
    margin: "15px 0px",
  },
  prev: {
    marginRight: "10px",
  },
}));

const Marca = ({ match }) => {
  const { Marca } = useContext(AppContext);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const {
    params: { marca },
  } = match;
  const [productos, setProductos] = useState({ results: [] });
  let items = [];

  for (let i = 1; i <= productos.last_page; i++) {
    items.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  const consulta = async (pagina) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const URL = `https://www.dyna.com.co/api/productos?marca=${encodeURIComponent(
        marca
      )}&page=${pagina}`;
      const req = await fetch(URL);
      const res = await req.json();
      setProductos(res);
      setPage(pagina);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    consulta(page);
  }, []);

  const handleChange = (e) => {
    consulta(e.target.value);
  };

  return (
    <div>
      <div className={classes.contenedorPrincipal}>
        <img className={classes.img} src={Marca.foto} alt={Marca.marca} />
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Página</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={page}
            onChange={handleChange}
          >
            {items}
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={3}>
        {productos.results.map((producto) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={producto.codigo}>
            <ProductoCard producto={producto} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.acciones}>
        {page > 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => consulta(page - 1)}
            className={classes.prev}
          >
            Prev
          </Button>
        )}
        {page < productos.last_page && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => consulta(page + 1)}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default Marca;
