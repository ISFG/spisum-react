import { Button } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { useStyles } from "../../dialog/Dialog.styles";
import {
  ErrorPic,
  useStyles as useBoundariesStyles
} from "../ErrorBoundary.styles";

export const DocumentViewError = () => {
  const classes = useStyles();
  const errorBoundaryClasses = useBoundariesStyles();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div
      className={clsx(
        "body-fullsize",
        errorBoundaryClasses.centeredError,
        classes.modalContent
      )}
    >
      <ErrorPic />
      <div className={classes.mtGap}>
        {t(translationPath(lang.errorBoundary.defaultMessage))}
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
      </div>
    </div>
  );
};
