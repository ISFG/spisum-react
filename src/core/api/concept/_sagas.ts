import { ApiURL } from "core/apiURL";
import { call, put, takeEvery } from "redux-saga/effects";
import { convertResponse } from "share/utils/convert";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { mapResponseToConcept, updateMapperRequestMapper } from "./mappers";
import {
  conceptCancelActionType,
  conceptCreateActionType,
  conceptRecoverActionType,
  conceptRevertVersionActionType,
  conceptUpdateActionType
} from "./_actions";

export function* watchApiConceptSagas() {
  yield takeEvery(getType(conceptCreateActionType.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.CONCEPT_CREATE,
      "POST",
      {
        bodyJSON: {}
      }
    );

    if (!success) {
      yield put(conceptCreateActionType.failure(errorResponse));
      return;
    }

    yield put(conceptCreateActionType.success(mapResponseToConcept(response)));
  });

  yield takeEvery(getType(conceptUpdateActionType.request), function* ({
    payload
  }: ActionType<typeof conceptUpdateActionType.request>) {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.CONCEPT_UPDATE,
      "POST",
      {
        bodyJSON: updateMapperRequestMapper(payload.body),
        urlWildCards: {
          nodeId: payload.nodeId
        }
      }
    );

    if (!success) {
      yield put(conceptUpdateActionType.failure(errorResponse));
      return;
    }

    yield put(conceptUpdateActionType.success(convertResponse(response)));
  });

  yield takeEvery(getType(conceptRecoverActionType.request), function* ({
    payload
  }: ActionType<typeof conceptRecoverActionType.request>) {
    const { body } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.CONCEPT_RECOVER,
      "POST",
      {
        bodyJSON: body
      }
    );

    if (!success) {
      yield put(conceptRecoverActionType.failure(errorResponse));
      return;
    }

    if (response && response.length) {
      yield put(
        conceptRecoverActionType.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(conceptRecoverActionType.success());
  });

  yield takeEvery(getType(conceptRevertVersionActionType.request), function* ({
    payload
  }: ActionType<typeof conceptRevertVersionActionType.request>) {
    const { nodeId, versionId } = payload;
    const { errorResponse, success, response } = yield call(
      fetchSaga,
      ApiURL.CONCEPT_REVERT,
      "POST",
      {
        bodyJSON: {},
        urlWildCards: {
          nodeId,
          versionId
        }
      }
    );

    if (!success) {
      yield put(conceptRevertVersionActionType.failure(errorResponse));
      return;
    }

    yield put(conceptRevertVersionActionType.success(response));
  });

  yield takeEvery(getType(conceptCancelActionType.request), function* ({
    payload
  }: ActionType<typeof conceptCancelActionType.request>) {
    const { nodeId, body } = payload;
    const { errorResponse, success, response } = yield call(
      fetchSaga,
      ApiURL.CONCEPT_CANCEL,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(conceptCancelActionType.failure(errorResponse));
      return;
    }

    yield put(conceptCancelActionType.success(response));
  });
}
