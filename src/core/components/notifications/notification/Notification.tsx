import MuiAlert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import React, { useCallback } from "react";
import { SnackbarLayout } from "./Notification.styles";
import {
  NotificationSeverity,
  NotificationVariant,
  NotificationWithIdType
} from "../_types";

export interface NotificationProps extends NotificationWithIdType {
  component?: (props: NotificationComponentProps) => JSX.Element;
  isUsed?: boolean;
  onClose: (notificationId: NotificationWithIdType["id"]) => void;
}

export interface NotificationComponentProps {
  message: NotificationProps["message"];
  onClose: () => void;
}

export const Notification = React.memo(
  ({
    alertTitle = null,
    component: Component,
    color,
    hideDuration = 3000,
    icon = true,
    id,
    isUsed = false,
    message,
    onClose,
    severity = NotificationSeverity.Success,
    variant = NotificationVariant.Error
  }: NotificationProps) => {
    const [isOpen, setOpen] = React.useState(true);

    const handleClose = useCallback(
      (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
          return;
        }

        setOpen(false);
        onClose(id);
      },
      [id, onClose]
    );

    return (
      <SnackbarLayout
        {...(isUsed && { transitionDuration: 0 })}
        autoHideDuration={hideDuration}
        onClose={handleClose}
        open={isOpen}
      >
        <MuiAlert
          {...(color && { color })}
          elevation={6}
          {...(icon && icon !== true && { icon })}
          onClose={handleClose}
          severity={severity}
          variant={variant}
        >
          {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
          {Component && <Component message={message} onClose={handleClose} />}
          {!Component && message}
        </MuiAlert>
      </SnackbarLayout>
    );
  }
);
