import { ApiURL } from "core/apiURL";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import {
  emailAccountsAction,
  emailDontRegisterActionType,
  emailIncompleteActionType
} from "./_actions";

export function* watchEmailDontRegister() {
  yield takeEvery(getType(emailDontRegisterActionType.request), function* ({
    payload
  }: ActionType<typeof emailDontRegisterActionType.request>) {
    const { nodeId, body } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.EMAIL_DONT_REGISTER,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(emailDontRegisterActionType.failure(errorResponse));
      return;
    }

    yield put(emailDontRegisterActionType.success());
  });
}

export function* watchEmailIncomplete() {
  yield takeEvery(getType(emailIncompleteActionType.request), function* ({
    payload
  }: ActionType<typeof emailIncompleteActionType.request>) {
    const { nodeId, subject, body, files } = payload;

    const bodyFormData = new FormData();
    files?.forEach((file) => bodyFormData.append("files", file));
    bodyFormData.append("body", body);
    bodyFormData.append("subject", subject);

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.EMAIL_INCOMPLETE,
      "POST",
      {
        bodyFormData,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(emailIncompleteActionType.failure(errorResponse));
      return;
    }

    yield put(emailIncompleteActionType.success());
  });
}

export function* watchEmailAccountsAction() {
  yield takeLatest(getType(emailAccountsAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.EMAIL_ACCOUNTS,
      "GET"
    );

    if (!success) {
      yield put(emailAccountsAction.failure(errorResponse));
      return;
    }

    yield put(emailAccountsAction.success(response));
  });
}
