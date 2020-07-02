import { Button, Dialog } from "@material-ui/core";
import { loginKeepAction } from "core/features/login/_actions";
import { logoutAction } from "core/features/logout/_actions";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import reactStringReplace from "react-string-replace";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  StyledDialogTitle,
  useStyles
} from "../../components/dialog/Dialog.styles";
import { automaticLogoutDialogCloseAction } from "./_actions";

interface OwnProps {
  timeout: number;
}

const DialogModal = ({ timeout }: OwnProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [seconds, setSeconds] = React.useState(timeout);
  const [open, setOpen] = React.useState(true);

  useEffect(
    () => {
      let countdown = seconds;
      const interval = setInterval(() => {
        if (countdown > 0) {
          countdown--;
          setSeconds(countdown);
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const dontLogout = () => {
    handleClose();
    dispatch(loginKeepAction.request());
  };

  const handleClose = () => {
    dispatch(automaticLogoutDialogCloseAction());
    setOpen(false);
  };

  const logout = () => {
    handleClose();
    dispatch(logoutAction.request());
  };

  const LogoutTimer = () => {
    return (
      <div>
        {reactStringReplace(
          seconds > 60
            ? t(translationPath(lang.logout.warningMinutes), {
                minutes: Math.ceil(seconds / 60)
              })
            : t(translationPath(lang.logout.warningSeconds), { seconds }),
          /<b[^>]*>(.*?)<\/b>/,
          (match, i) => (
            <b key={i}>{match}</b>
          )
        )}
      </div>
    );
  };

  return (
    <Dialog
      disableBackdropClick={true}
      onClose={handleClose}
      open={open}
      scroll="paper"
      PaperProps={{ square: true }}
    >
      <StyledDialogTitle>
        {t(translationPath(lang.logout.automaticLogout))}
      </StyledDialogTitle>
      <div className={classes.modalBody}>
        <LogoutTimer />
      </div>
      <div className={classes.actionsContainer}>
        <Button
          className={classes.action}
          color="secondary"
          data-test-id="dialog-dontlogout-button"
          onClick={dontLogout}
          variant="outlined"
        >
          {t(translationPath(lang.logout.dontLogout))}
        </Button>
        <Button
          className={classes.buttonCancel}
          data-test-id="dialog-logout-button"
          onClick={logout}
          variant="outlined"
        >
          {t(translationPath(lang.logout.logout))}
        </Button>
      </div>
    </Dialog>
  );
};

export default DialogModal;
