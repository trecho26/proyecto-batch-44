import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Typography,
  TextField,
  Button,
  Container,
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import firebase from "../Firebase";
import Error from "../Components/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(315deg, rgba(64,123,255,1) 45%, rgba(122,163,255,1) 100%)",
    "& img": {
      width: "100%",
      maxWidth: "500px",
    },
    [theme.breakpoints.down("md")]: {
      width: "0%",
    },
  },
  paperForm: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();

  const [user, handleOnChange] = useForm({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userName, email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    crearUsuario();
  };

  const crearUsuario = async () => {
    try {
      await firebase.registrar(userName, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className={classes.root}>
      <Container maxWidth="sm" className={classes.paperForm}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>
          {error && <Error mensaje={error} />}
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Nombre de usuario"
              name="userName"
              type="userName"
              autoComplete="userName"
              autoFocus
              onChange={handleOnChange}
              value={userName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo"
              name="email"
              type="email"
              autoComplete="email"
              onChange={handleOnChange}
              value={email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              name="password"
              type="password"
              id="password"
              onChange={handleOnChange}
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrarse
            </Button>
          </form>
          <Link to="/login">
            <Typography variant="caption">Ya tengo una cuenta</Typography>
          </Link>
        </div>
      </Container>
    </main>
  );
};

export default SignUp;
