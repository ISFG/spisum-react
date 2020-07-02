import { call, put, takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { ApiURL } from "../../../../core/apiURL";
import { fetchSaga } from "../../../utils/fetch";
import { returnToRepositoryActionType } from "./_actions";

export function* watchReturnToRepositoryAction() {
  yield takeEvery(getType(returnToRepositoryActionType.request), function* ({
    payload
  }: ActionType<typeof returnToRepositoryActionType.request>) {
    const { nodeId, nodeType } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.RETURN_TO_REPOSITORY,
      "POST",
      {
        urlWildCards: {
          nodeId,
          nodeType
        }
      }
    );

    if (!success) {
      yield put(returnToRepositoryActionType.failure(errorResponse));
      return;
    }

    yield put(returnToRepositoryActionType.success(response));
  });
}
