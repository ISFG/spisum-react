import { call, put, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { fetchSaga } from "../../../share/utils/fetch";
import { ApiURL } from "../../apiURL";
import { createRetentionProposalAction } from "./_actions";

export function* watchRetentionActions() {
  yield takeEvery(getType(createRetentionProposalAction.request), function* ({
    payload
  }: ActionType<typeof createRetentionProposalAction.request>) {
    const { name, ids } = payload;
    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.RETENTION_CREATE_RETENTION_PROPOSAL,
      "POST",
      {
        bodyJSON: {
          ids,
          name
        }
      }
    );

    if (!success) {
      yield put(createRetentionProposalAction.failure(errorResponse));
      return;
    }

    yield put(createRetentionProposalAction.success());
  });
}
