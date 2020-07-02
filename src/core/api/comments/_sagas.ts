import { ApiURL } from "core/apiURL";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { convertResponse } from "share/utils/convert";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { getNodeTypeSuffix } from "../../mappers/api/general";
import { addCommentsAction, getCommentsAction } from "./_actions";

export function* watchFetchComments() {
  yield takeEvery(getType(getCommentsAction.request), function* ({
    payload
  }: ActionType<typeof getCommentsAction.request>) {
    const { maxItems = 100, skipCount = 0, nodeId, nodeType } = payload;

    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.COMMENTS,
      "GET",
      {
        params: {
          maxItems: String(maxItems),
          skipCount: String(skipCount)
        } as Record<string, string>,
        urlWildCards: {
          nodeId,
          nodeType: nodeTypeSuffix
        }
      }
    );

    if (!success) {
      yield put(getCommentsAction.failure(errorResponse.payload));
      return;
    }

    yield put(getCommentsAction.success(convertResponse(response)));
  });
}

export function* watchAddComments() {
  yield takeLatest(getType(addCommentsAction.request), function* ({
    payload
  }: ActionType<typeof addCommentsAction.request>) {
    const { nodeId, body, nodeType } = payload;

    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.COMMENT_CREATE,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId,
          nodeType: nodeTypeSuffix
        }
      }
    );

    if (!success) {
      yield put(addCommentsAction.failure(errorResponse));
      return;
    }
    yield put(addCommentsAction.success(convertResponse(response)));
  });
}
