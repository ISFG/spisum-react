import { ApiURL } from "core/apiURL";
import { call, delay, put, race, take, takeLatest } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { RefreshStatusPayload } from "./types";
import {
  documentDataBoxRefreshAction,
  documentDataBoxRefreshStatusAction,
  documentEmailRefreshAction,
  documentEmailRefreshStatusAction,
  documentRefreshAction
} from "./_actions";

export function* watchDigitalDocumentRefreshAction() {
  yield takeLatest(getType(documentEmailRefreshAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.EMAIL_REFRESH,
      "POST"
    );
    if (!success) {
      yield put(documentEmailRefreshAction.failure(errorResponse));
    }
    yield put(documentEmailRefreshAction.success(response));
  });

  yield takeLatest(
    getType(documentEmailRefreshStatusAction.request),
    function* ({
      payload
    }: ActionType<typeof documentEmailRefreshStatusAction.request>) {
      const id = payload;
      let running = true;
      let responseData = {};
      let successData;
      let errorResponseData;

      while (running) {
        const { errorResponse, response, success } = yield call(
          fetchSaga,
          ApiURL.EMAIL_STATUS,
          "GET",
          {
            params: {
              id: id.toString()
            } as Record<string, string>
          }
        );
        successData = success;
        if (!success) {
          errorResponseData = errorResponse;
          break;
        }
        responseData = response;
        running = response.running;
        if (response.running) {
          yield delay(3000);
        }
      }

      if (!successData) {
        yield put(documentEmailRefreshStatusAction.failure(errorResponseData));
      }
      yield put(
        documentEmailRefreshStatusAction.success(
          responseData as RefreshStatusPayload
        )
      );
    }
  );

  yield takeLatest(getType(documentDataBoxRefreshAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DATABOX_REFRESH,
      "POST"
    );
    if (!success) {
      yield put(documentDataBoxRefreshAction.failure(errorResponse));
    }
    yield put(documentDataBoxRefreshAction.success(response));
  });

  yield takeLatest(
    getType(documentDataBoxRefreshStatusAction.request),
    function* ({
      payload
    }: ActionType<typeof documentDataBoxRefreshStatusAction.request>) {
      const id = payload;
      let running = true;
      let responseData = {};
      let successData;
      let errorResponseData;

      while (running) {
        const { errorResponse, response, success } = yield call(
          fetchSaga,
          ApiURL.DATABOX_STATUS,
          "GET",
          {
            params: {
              id: id.toString()
            } as Record<string, string>
          }
        );
        successData = success;
        if (!success) {
          errorResponseData = errorResponse;
          break;
        }
        responseData = response;
        running = response.running;
        if (response.running) {
          yield delay(3000);
        }
      }

      if (!successData) {
        yield put(
          documentDataBoxRefreshStatusAction.failure(errorResponseData)
        );
      }
      yield put(
        documentDataBoxRefreshStatusAction.success(
          responseData as RefreshStatusPayload
        )
      );
    }
  );

  yield takeLatest(getType(documentRefreshAction.request), function* ({
    payload
  }: ActionType<typeof documentRefreshAction.request>) {
    const { refreshAction, statusAction } = payload;
    yield put(refreshAction.request());

    const [successResponse, errorResponse] = yield race([
      take(refreshAction.success),
      take(refreshAction.failure)
    ]);

    if (successResponse) {
      const id = successResponse.payload;
      yield put(statusAction.request(id));
    } else {
      yield put(documentRefreshAction.failure(errorResponse));
    }

    const [successData] = yield race([
      take(statusAction.success),
      take(statusAction.failure)
    ]);

    if (successData) {
      yield put(documentRefreshAction.success(successData.payload));
    } else {
      yield put(documentRefreshAction.failure(errorResponse));
    }
  });
}
