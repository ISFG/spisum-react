import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions/dist/type-helpers";
import {
  UploadFailure,
  UploadInfo,
  UploadProgress,
  UploadSuccess
} from "./_types";

const NS = "@core/action/UPLOAD_FILE/";

export const uploadFileAction = createSafeAction(`${NS}INIT`)<UploadInfo>();

export const uploadFileWithNotificationAction = createSafeAction(
  `${NS}INIT/WITH_NOTIFICATION`
)<UploadInfo>();

export const uploadProgressAction = createSafeAction(`${NS}PROGRESS`)<
  UploadProgress
>();

export const uploadSuccessAction = createSafeAction(`${NS}SUCCESS`)<
  UploadSuccess
>();

export const uploadFailureAction = createSafeAction(`${NS}FAILURE`)<
  UploadFailure
>();

export type UploadFileActionType = ActionType<
  | typeof uploadFileAction
  | typeof uploadFileWithNotificationAction
  | typeof uploadProgressAction
  | typeof uploadSuccessAction
  | typeof uploadFailureAction
>;
