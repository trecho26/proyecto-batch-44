import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Divider,
  IconButton,
  makeStyles,
  Tab,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  texto: {
    margin: "15px 0px",
  },
  mainInfo: {
    display: "flex",
    flexDirection: "column",
    padding: "20px 10px",
  },
  secondInfo: {
    display: "flex",
    justifyContent: "space-around",
    margin: "40px 0px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  img: {
    maxWidth: "100%",
  },
  precio: {
    "& span": {
      color: "#FFC440",
      fontWeight: "600",
      fontSize: "1.8em",
    },
  },
}));

const ModalProducto = ({ producto, open, setOpen }) => {
  const classes = useStyles();
  const precioFormateado = producto.precio.toFixed(2);
  const [value, setValue] = useState("1");
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <Typography variant="h6" component="p">
            Producto seleccionado
          </Typography>

          <IconButton
            color="secondary"
            aria-label="close"
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.header}>
            <img
              src={producto.foto}
              alt={producto.descripcion}
              className={classes.img}
            />
            <div className={classes.mainInfo}>
              <Typography variant="h5" component="h3" className={classes.texto}>
                {producto.descripcion}
              </Typography>

              <Divider />
              <Typography variant="h6" component="p" className={classes.texto}>
                Codigo: {producto.codigo}
              </Typography>
              <Typography
                variant="h6"
                component="p"
                className={`${classes.precio} ${classes.texto} `}
              >
                Precio:{" "}
                <span className={classes.precio}>
                  ${new Intl.NumberFormat("en-US").format(precioFormateado)}
                </span>
              </Typography>
              <Typography variant="subtitle1" component="p">
                Marca: {producto.marca}
              </Typography>
              <Typography variant="subtitle1" component="p">
                Categoria: {producto.categoria}
              </Typography>
            </div>
          </div>
          <div className={classes.secondInfo}></div>
          <TabContext value={value}>
            <TabList onChange={handleChange} centered>
              <Tab label="Caracteristicas" value="1" />
              <Tab label="Ficha tecnica" value="2" />
            </TabList>
            <TabPanel value={"1"}>
              <Typography variant="body2" component="p">
                {producto.caracteristicas}
              </Typography>
            </TabPanel>
            <TabPanel value={"2"}>
              <img
                src={producto.ficha}
                alt={`ficha tecnica ${producto.descripcion}`}
                className={classes.img}
              />
            </TabPanel>
          </TabContext>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Añadir carrito
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalProducto;
