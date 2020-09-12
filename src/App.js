import React, { useState } from "react";
import { AppContext } from "./Context/AppContext";
import AppRouter from "./Routes/AppRouter";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { FirebaseContext } from "./Firebase";
import useAutenticación from "./hooks/useAutenticacion";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#407BFF",
    },
  },
});

function App() {
  const usuario = useAutenticación();
  const [Marca, setMarca] = useState({});
  return (
    <FirebaseContext.Provider
      value={{
        usuario,
      }}
    >
      <AppContext.Provider
        value={{
          Marca,
          setMarca,
        }}
      >
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </AppContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
