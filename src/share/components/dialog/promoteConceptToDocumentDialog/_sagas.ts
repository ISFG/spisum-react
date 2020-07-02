import { ApiURL } from "core/apiURL";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { fetchSaga } from "../../../utils/fetch";
import { promoteConceptToDocumentAction } from "./_actions";

export function* watchPromoteConceptToDocumentAction() {
  yield takeLatest(getType(promoteConceptToDocumentAction.request), function* ({
    payload
  }: ActionType<typeof promoteConceptToDocumentAction.request>) {
    const { nodeId, body } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.CONCEPT_TO_DOCUMENT,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(promoteConceptToDocumentAction.failure(errorResponse.payload));
      return;
    }

    yield put(promoteConceptToDocumentAction.success(response));
  });
}
