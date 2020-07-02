import { call, put, select, take, takeEvery } from "redux-saga/effects";
import { createRequest, getURL } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { RootStateType } from "../../../reducers";
import { notificationAction } from "../../components/notifications/_actions";
import { NotificationComponent } from "../../components/notifications/_types";
import {
  uploadFailureAction,
  uploadFileAction,
  uploadFileWithNotificationAction,
  uploadProgressAction,
  uploadSuccessAction
} from "./_actions";
import { createUploadFileChannel } from "./_channels";
import { UploadInfo } from "./_types";

export function* watchUploadFileAction() {
  yield takeEvery(getType(uploadFileAction), function* ({
    payload
  }: ActionType<typeof uploadFileAction>) {
    yield call(uploadFileSaga, payload);
  });
}

export function* watchUploadFileWithNotificationAction() {
  yield takeEvery(getType(uploadFileWithNotificationAction), function* ({
    payload
  }: ActionType<typeof uploadFileWithNotificationAction>) {
    yield put(uploadFileAction(payload));
    yield put(
      notificationAction({
        fileName: payload.file.name,
        message: "",
        type: NotificationComponent.FileUploadProgress
      })
    );
  });
}

export function* uploadFileSaga({ endpoint, file }: UploadInfo) {
  const activeGroup = yield select(
    (state: RootStateType) => state.loginReducer.session.activeGroup
  );
  const privateToken = yield select(
    (state: RootStateType) => state.loginReducer.session.token
  );

  const { headers } = createRequest({
    activeGroup,
    method: "POST",
    privateToken
  });

  const channel = yield call(createUploadFileChannel, {
    endpoint: getURL(endpoint),
    file,
    headers: headers as Record<string, string>
  });

  while (true) {
    const { progress = 0, error, success } = yield take(channel);

    if (error) {
      yield put(
        uploadFailureAction({
          error,
          file
        })
      );
      return;
    }

    if (success) {
      yield put(
        uploadSuccessAction({
          file
        })
      );
      return;
    }

    yield put(
      uploadProgressAction({
        file,
        progress
      })
    );
  }
}
