import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { ApiURL } from "../../apiURL";
import { getImprintAction } from "./_actions";
import { componentDownloadAction } from "../components/_actions";
import contentDisposition from "content-disposition";
import fileDownload from "js-file-download";

export function* watchDailyImprint() {
  yield takeEvery(getType(getImprintAction.request), function* ({
    payload
  }: ActionType<typeof getImprintAction.request>) {
    const { nodeId } = payload;
    const { errorResponse, success, response, responseHeaders } = yield call(
      fetchSaga,
      ApiURL.ADMIN_NODES_DOWNLOAD,
      "POST",
      {
        bodyJSON: [nodeId]
      }
    );

    if (!success) {
      yield put(componentDownloadAction.failure(errorResponse.payload));
      return;
    }

    const disposition = contentDisposition.parse(
      responseHeaders.get("content-disposition")
    );

    fileDownload(response, disposition.parameters.filename);

    yield put(componentDownloadAction.success(response));
  });
}
