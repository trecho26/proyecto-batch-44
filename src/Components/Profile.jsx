import React, { useContext } from "react";
import { FirebaseContext } from "../Firebase";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import MailIcon from "@material-ui/icons/Mail";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
}));
const Profile = () => {
  const classes = useStyles();
  const { usuario } = useContext(FirebaseContext);
  const fecha = new Date(parseInt(usuario.metadata.a));
  const formato = { year: "numeric", month: "short", day: "numeric" };
  const fechaFormateada = new Intl.DateTimeFormat("es-MX", formato).format(
    fecha
  );

  return (
    <>
      <List className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Nombre de usuario"
            secondary={usuario.displayName}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <MailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Correo" secondary={usuario.email} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              <HowToRegIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Creacion de la cuenta"
            secondary={fechaFormateada}
          />
        </ListItem>
      </List>
    </>
  );
};

export default Profile;
