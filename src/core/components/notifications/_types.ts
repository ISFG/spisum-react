export enum NotificationSeverity {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning"
}

export enum NotificationColor {
  Error = "error",
  Info = "info",
  Success = "success",
  Warning = "warning"
}

export enum NotificationVariant {
  Error = "filled",
  Standard = "standard",
  Outlined = "outlined"
}

export enum NotificationComponent {
  Default = "default",
  FileUploadProgress = "fileUploadProgress"
}

export interface NotificationType {
  alertTitle?: string | null;
  type?: NotificationComponent;
  color?: NotificationColor;
  fileName?: string;
  hideDuration?: number | null;
  icon?: boolean | JSX.Element;
  message: string | null | JSX.Element;
  severity?: NotificationSeverity;
  variant?: NotificationVariant;
}

export interface NotificationWithIdType extends NotificationType {
  id: string;
}

export type NotificationStateType = {
  queue: NotificationWithIdType[];
};
