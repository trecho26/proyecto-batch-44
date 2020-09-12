import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Imagen from "../../src/Company-amico.svg";
import Category from "@material-ui/icons/Category";
import { Business, NavigateNext } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: "250px",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  enlace: {
    textDecoration: "none",
    color: "#000000DE",
  },
}));

const DrawerUI = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();

  const [categorias, setCategorias] = useState({
    open: false,
    categorias: [],
  });
  const [marcas, setMarcas] = useState({
    open: false,
    marcas: [],
  });

  const handleClick = (target) => {
    switch (target) {
      case "categorias":
        setCategorias({ ...categorias, open: !categorias.open });
        break;
      case "marcas":
        setMarcas({ ...marcas, open: !marcas.open });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const consulta = async () => {
      const URL = "https://www.dyna.com.co/api/categorias";
      const req = await fetch(URL);
      const res = await req.json();
      setCategorias({ ...categorias, categorias: res.results });
    };
    consulta();
  }, []);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <div className={classes.img}>
        <img src={Imagen} alt="banner principal" />
      </div>
      <List component="nav" className={classes.list}>
        <ListItem button onClick={() => handleClick("categorias")}>
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="Categorias" />
          {categorias.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={categorias.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categorias.categorias.map((categoria) => (
              <Link
                to={`/categorias/${categoria.categoria}`}
                className={classes.enlace}
                key={categoria.categoria}
              >
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <NavigateNext />
                  </ListItemIcon>
                  <ListItemText primary={categoria.categoria} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Collapse>
        <Link to="/marcas/" className={classes.enlace}>
          <ListItem button>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Marcas" />
          </ListItem>
        </Link>
      </List>
    </SwipeableDrawer>
  );
};

export default DrawerUI;
