import { Button } from "@material-ui/core";
import MuiTooltip from "@material-ui/core/Tooltip";
import clsx from "clsx";
import { OwnProps as ErrorBoundaryProps } from "core/components/errorBoundary/ErrorBoundary";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  StyledCancelIcon,
  StyledDialogTitle,
  useStyles
} from "../../dialog/Dialog.styles";
import {
  ErrorBoundaryContainer,
  ErrorPic,
  useStyles as useBoundariesStyles
} from "../ErrorBoundary.styles";

export const DialogTabError = (props: ErrorBoundaryProps) => {
  const classes = useStyles();
  const { reloadTab, clearErrorState } = props;
  const refreshCurrentTab = () => {
    clearErrorState?.();
    reloadTab?.();
  };

  return (
    <ErrorBoundaryContainer className="body-fullsize">
      <ErrorPic />
      <div className={classes.mtGap}>
        {t(translationPath(lang.errorBoundary.reloadDialogTab))}
      </div>
      <Button
        className={classes.mtGap}
        color="primary"
        data-test-id=""
        variant="outlined"
        onClick={refreshCurrentTab}
      >
        {t(translationPath(lang.errorBoundary.loadContent))}
      </Button>
    </ErrorBoundaryContainer>
  );
};

export const DialogError = (props: ErrorBoundaryProps) => {
  const classes = useStyles();
  const errorBoundaryClasses = useBoundariesStyles();
  const { clearErrorState, handleClose } = props;
  const handleCloseDialog = () => {
    clearErrorState?.();
    handleClose?.();
  };

  return (
    <>
      <StyledDialogTitle>
        {t(translationPath(lang.errorBoundary.error))}
        <MuiTooltip
          aria-label={t(translationPath(lang.dialog.form.close))}
          title={t(translationPath(lang.dialog.form.close))}
        >
          <StyledCancelIcon
            data-test-id="dialog-close-icon"
            onClick={handleCloseDialog}
          />
        </MuiTooltip>
      </StyledDialogTitle>

      <div className={clsx(classes.modalBody, classes.modalBodyFullSize)}>
        <div
          className={clsx("body-fullsize", errorBoundaryClasses.centeredError)}
        >
          <ErrorPic />
          <div className={classes.mtGap}>
            {t(translationPath(lang.errorBoundary.closeAndOpenDialog))}
          </div>
          <Button
            style={{ marginTop: 30 }}
            color="primary"
            data-test-id=""
            variant="outlined"
            onClick={handleCloseDialog}
          >
            {t(translationPath(lang.dialog.form.close))}
          </Button>
        </div>
      </div>
    </>
  );
};
