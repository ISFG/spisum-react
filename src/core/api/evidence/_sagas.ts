import { ApiURL } from "core/apiURL";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { evidenceSubmitToRepository } from "./_actions";

const ToRepositoryApi = {
  Documents: ApiURL.DOCUMENT_TO_REPOSITORY,
  Files: ApiURL.FILE_TO_REPOSITORY
};
export function* watchApiEvidenceSaga() {
  yield takeEvery(getType(evidenceSubmitToRepository.request), function* ({
    payload
  }: ActionType<typeof evidenceSubmitToRepository.request>) {
    const { body, entityType } = payload;
    const url = ToRepositoryApi[entityType];
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      url,
      "POST",
      {
        bodyJSON: body
      }
    );

    if (!success) {
      yield put(evidenceSubmitToRepository.failure(errorResponse));
      return;
    }
    if (response && response.length) {
      yield put(
        evidenceSubmitToRepository.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(evidenceSubmitToRepository.success(response));
  });
}
