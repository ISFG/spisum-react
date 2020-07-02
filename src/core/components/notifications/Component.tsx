import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { Dispatch } from "redux";
import { NotificationLayout } from "./Component.styles";
import { notificationAction__Clear, NotificationActionType } from "./_actions";
import { NotificationComponent } from "./_types";
import { FileUploadProgressNotification } from "./notification/fileUploadProgressNotification/FileUploadProgressNotification";
import { Notification } from "./notification/Notification";

const notificationComponents = {
  [NotificationComponent.Default]: Notification,
  [NotificationComponent.FileUploadProgress]: FileUploadProgressNotification
};

const NotificationsList = () => {
  const dispatch = useDispatch<Dispatch<NotificationActionType>>();
  const queue = useSelector(
    (state: RootStateType) => state.notificationReducer.queue
  );

  const onClose = useCallback(
    (notificationId: string) =>
      dispatch(notificationAction__Clear([notificationId])),
    [dispatch]
  );

  const notifications = useMemo(
    () =>
      queue.map((notification) => {
        const NotificationCom =
          notificationComponents[
            notification.type || NotificationComponent.Default
          ];

        return (
          <NotificationCom
            key={notification.id}
            {...notification}
            onClose={onClose}
          />
        );
      }),
    [onClose, queue]
  );

  return <NotificationLayout>{notifications}</NotificationLayout>;
};

export default NotificationsList;
