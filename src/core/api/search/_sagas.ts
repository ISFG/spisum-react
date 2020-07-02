import { ApiURL } from "core/apiURL";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { searchAction } from "./_actions";
import { fetchByCustomUrlAction } from "./_actions";

export function* watchFetchSearchAction() {
  yield takeEvery(getType(searchAction.request), function* ({
    payload
  }: ActionType<typeof searchAction.request>) {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.SEARCH,
      "POST",
      {
        bodyJSON: payload
      }
    );

    if (!success) {
      yield put(searchAction.failure(errorResponse));
      return;
    }

    yield put(searchAction.success(response));
  });

  yield takeEvery(getType(fetchByCustomUrlAction.request), function* ({
    payload
  }: ActionType<typeof fetchByCustomUrlAction.request>) {
    const { customUrl, maxItems, orderBy, skipCount, where, include } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      customUrl,
      "GET",
      {
        params: {
          ...(maxItems && { maxItems }),
          ...(orderBy && { orderBy: orderBy?.join(",") }),
          ...(skipCount && { skipCount }),
          ...(where && { where }),
          ...(include?.length && { include: include?.join(",") })
        } as Record<string, string>
      }
    );

    if (!success) {
      yield put(fetchByCustomUrlAction.failure(errorResponse));
      return;
    }

    yield put(fetchByCustomUrlAction.success(response));
  });
}
