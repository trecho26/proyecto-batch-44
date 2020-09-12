import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  Paper,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link } from "react-router-dom";
import firebase from "../Firebase";

//Images
import LoginSvg from "../Company-amico.svg";
//Hooks
import { useForm } from "../hooks/useForm";
//Componentes
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

const Login = () => {
  const classes = useStyles();
  const [user, handleOnChange] = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  };

  const iniciarSesion = async () => {
    try {
      await firebase.login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={6} className={classes.image}>
        <img src={LoginSvg} alt="Imagen de inicio de sesion" />
      </Grid>
      <Grid item xs={12} sm={6} component={Paper} elevation={6} square>
        <Container maxWidth="sm" className={classes.paperForm}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            {error && <Error mensaje={error} />}
            <form className={classes.form} onSubmit={handleSubmit}>
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
                autoFocus
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
                Ingresar
              </Button>
            </form>
            <Link to="/signUp">
              <Typography variant="caption">
                ¿No tienes una cuenta?, Registarte.
              </Typography>
            </Link>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
