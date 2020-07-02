import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";
import { NotificationType, NotificationWithIdType } from "./_types";

export const notificationAction = createSafeAction(
  "@notification/NEW_NOTIFICATION"
)<NotificationType>();

export const notificationAction__Clear = createSafeAction(
  "@notification/CLEAR"
)<NotificationWithIdType["id"][]>();

export type NotificationActionType = ActionType<
  typeof notificationAction | typeof notificationAction__Clear
>;
