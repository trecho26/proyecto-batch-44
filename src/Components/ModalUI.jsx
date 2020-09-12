import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Profile from "./Profile";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "8px",
    paddingRight: "24px",
  },
});

const ModalUI = ({ modalOpen, setModalOpen }) => {
  const classess = useStyles();
  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Perfil de usuario</DialogTitle>
      <DialogContent className={classess.root}>
        <Profile />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalOpen(false)} color="primary" autoFocus>
          Listo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUI;
