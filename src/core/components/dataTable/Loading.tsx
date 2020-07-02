import { Modal } from "@material-ui/core";
import React from "react";
import BookShelfLoader from "../bookshelfLoader";
import { useStyles } from "./Loading.styles";

const Loading = () => {
  const classes = useStyles();

  return (
    <Modal
      BackdropProps={{ invisible: true }}
      disablePortal={true}
      disableEnforceFocus={true}
      disableAutoFocus={true}
      open={true}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      className={classes.modal}
    >
      <>
        <BookShelfLoader />
      </>
    </Modal>
  );
};

export default Loading;
