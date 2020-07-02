import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { translationPath } from "../../../../share/utils/getPath";
import { lang, t } from "../../../../translation/i18n";
import { callAsyncAction } from "../../../action";
import { logoutAction } from "../../../features/logout/_actions";
import { useStyles } from "../../dialog/Dialog.styles";
import { ErrorBoundaryContainer, ErrorPic } from "../ErrorBoundary.styles";

export interface OwnProps {
  reloadTab?: VoidFunction;
  clearErrorState: VoidFunction;
  handleClose?: VoidFunction;
}

export const GlobalError = (props: OwnProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { clearErrorState } = props;

  const reloadPage = () => {
    window.location.reload();
  };

  const goToLoginPage = () => {
    dispatch(
      callAsyncAction({
        action: logoutAction,
        onSuccess: clearErrorState
      })
    );
  };

  return (
    <ErrorBoundaryContainer>
      <ErrorPic />
      <div className={classes.mtGap}>
        {t(translationPath(lang.errorBoundary.globalError))}
      </div>
      <div style={{ marginTop: 30 }}>
        <Button
          className={classes.mrGap}
          color="primary"
          data-test-id=""
          variant="outlined"
          onClick={reloadPage}
        >
          {t(translationPath(lang.errorBoundary.reload))}
        </Button>
        <Button
          className={classes.mlGap}
          color="primary"
          data-test-id=""
          variant="outlined"
          onClick={goToLoginPage}
        >
          {t(translationPath(lang.errorBoundary.goToLogin))}
        </Button>
      </div>
    </ErrorBoundaryContainer>
  );
};
