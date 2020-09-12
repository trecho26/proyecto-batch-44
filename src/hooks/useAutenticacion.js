import { useEffect, useState } from "react";
import firebase from "../Firebase";

function useAutenticación() {
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

  useEffect(() => {
    const unSubscribe = firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        guardarUsuarioAutenticado(usuario);
      } else {
        guardarUsuarioAutenticado(null);
      }
    });

    return () => unSubscribe();
  }, []);

  return usuarioAutenticado;
}
export default useAutenticación;
