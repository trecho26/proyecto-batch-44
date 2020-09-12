import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import ModalProducto from "../ModalProducto";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    height: "270px",
    display: "flex",
    flexDirection: "column",
  },
  titulo: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  actions: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: "#eeeeee",
  },
  precio: {
    // color: "#00A650",
  },
  chipContainer: {
    position: "relative",
  },
  chip: {
    position: "absolute",
    bottom: "5px",
    right: "5px",
    backgroundColor: "#FFC440",
    fontWeight: "500",
  },
}));

const ProductoCard = ({ producto }) => {
  const [open, setOpen] = React.useState(false);
  const { descripcion, foto, precio, codigo, categoria, marca } = producto;
  const precioFormateado = precio.toFixed(2);
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={() => setOpen(true)}>
          <div className={classes.chipContainer}>
            <CardMedia
              component="img"
              alt={descripcion}
              height="140"
              image={foto}
              title={descripcion}
            />
            <Chip className={classes.chip} label={`#${codigo}`} />
          </div>
          <CardContent>
            <Typography
              className={classes.titulo}
              gutterBottom
              variant="body1"
              component="h3"
            >
              {descripcion}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {categoria}
            </Typography>
          </CardContent>
        </CardActionArea>

        <div className={classes.actions}>
          <Typography variant="body2" component="p">
            Marca: {marca}
          </Typography>
          <Typography variant="h5" component="p" className={classes.precio}>
            ${new Intl.NumberFormat("en-US").format(precioFormateado)}
          </Typography>
        </div>
      </Card>
      {open && (
        <ModalProducto producto={producto} open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default ProductoCard;
