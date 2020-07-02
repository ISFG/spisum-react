import { ApiURL } from "core/apiURL";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import {
  databoxAccountsAction,
  databoxDontRegisterActionType
} from "./_actions";

export function* watchDataboxDontRegister() {
  yield takeEvery(getType(databoxDontRegisterActionType.request), function* ({
    payload
  }: ActionType<typeof databoxDontRegisterActionType.request>) {
    const { nodeId, body } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.DATABOX_DONT_REGISTER,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(databoxDontRegisterActionType.failure(errorResponse));
      return;
    }

    yield put(databoxDontRegisterActionType.success());
  });
}

export function* watchDataboxAccountsAction() {
  yield takeLatest(getType(databoxAccountsAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DATABOX_ACCOUNTS,
      "GET"
    );

    if (!success) {
      yield put(databoxAccountsAction.failure(errorResponse));
      return;
    }

    yield put(databoxAccountsAction.success(response));
  });
}
