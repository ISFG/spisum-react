import { ApiURL } from "core/apiURL";
import { transformDocumentForApi } from "core/mappers/api/document";
import { call, put, race, take, takeEvery } from "redux-saga/effects";
import {
  convertProps,
  convertResponse,
  omitFormiddenProps
} from "share/utils/convert";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { documentSaveReasonFormActionType } from "../../components/reasonForm/_actions";
import { SslProperties } from "../models";
import {
  documentAcceptActionType,
  documentAddToFavoriteAction,
  documentBorrowActionType,
  documentCancelActionType,
  documentCancelDiscardActionType,
  documentChangeFileMarkAction,
  documentChangeLocationActionType,
  documentChangeToAAction,
  documentChangeToSAction,
  documentCreateActionType,
  documentForSignatureActionType,
  documentFoundActionType,
  documentFromSignatureActionType,
  documentHandoverActionType,
  documentLostDestroyedActionType,
  documentOwnerCancelActionType,
  documentRecoverActionType,
  documentRegisterActionType,
  documentRemoveFromFavoriteAction,
  documentRevertVersionActionType,
  documentSaveAndUpdateActionType,
  documentSettleActionType,
  documentShreddingDiscardActionType,
  documentUpdateActionType
} from "./_actions";
import {
  closeModalLoadingAction,
  openModalLoadingAction
} from "../../components/layout/_actions";
import { getNodeTypeSuffix } from "../../mappers/api/general";

export function* watchApiDocumentSaga() {
  yield takeEvery(getType(documentCreateActionType.request), function* ({
    payload
  }: ActionType<typeof documentCreateActionType.request>) {
    const { nodeType, nodeId, documentType } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_CREATE,
      "POST",
      {
        bodyJSON: {
          documentType,
          nodeId,
          nodeType
        }
      }
    );

    if (!success) {
      yield put(documentCreateActionType.failure(errorResponse));
      return;
    }

    yield put(documentCreateActionType.success(convertResponse(response)));
  });

  yield takeEvery(getType(documentUpdateActionType.request), function* ({
    payload
  }: ActionType<typeof documentUpdateActionType.request>) {
    const { body, nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_UPDATE,
      "POST",
      {
        bodyJSON: {
          ...body,
          properties: convertProps(
            omitFormiddenProps<SslProperties>(
              transformDocumentForApi(body.properties)
            )
          )
        },
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentUpdateActionType.failure(errorResponse.payload));
      return;
    }

    yield put(documentUpdateActionType.success(convertResponse(response)));
  });

  yield takeEvery(getType(documentRegisterActionType.request), function* ({
    payload
  }: ActionType<typeof documentRegisterActionType.request>) {
    const { body, nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_REGISTER,
      "POST",
      {
        bodyJSON: {
          ...body,
          properties: convertProps(
            omitFormiddenProps<SslProperties>(
              transformDocumentForApi(body.properties)
            )
          )
        },
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentRegisterActionType.failure(errorResponse));
      return;
    }

    yield put(documentRegisterActionType.success(convertResponse(response)));
  });

  yield takeEvery(getType(documentHandoverActionType.request), function* ({
    payload
  }: ActionType<typeof documentHandoverActionType.request>) {
    const { body, nodeId, cancelDocumentOwner, nodeType } = payload;

    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);

    if (cancelDocumentOwner) {
      yield put(documentOwnerCancelActionType.request({ nodeId }));
      const [cancelError] = yield race([
        take(documentOwnerCancelActionType.failure),
        take(documentOwnerCancelActionType.success)
      ]);

      if (cancelError) {
        yield put(documentHandoverActionType.failure(cancelError));
      }
    }

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.OWNER_HANDOVER,
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
      yield put(documentHandoverActionType.failure(errorResponse));
      return;
    }

    yield put(documentHandoverActionType.success(response));
  });

  yield takeEvery(getType(documentOwnerCancelActionType.request), function* ({
    payload
  }: ActionType<typeof documentOwnerCancelActionType.request>) {
    const { body, nodeId, nodeType } = payload;

    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.OWNER_CANCEL,
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
      yield put(documentOwnerCancelActionType.failure(errorResponse));
      return;
    }

    yield put(documentOwnerCancelActionType.success(response));
  });

  yield takeEvery(getType(documentCancelActionType.request), function* ({
    payload
  }: ActionType<typeof documentCancelActionType.request>) {
    const { body, nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_CANCEL,
      "POST",
      {
        bodyJSON: body || {},
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentCancelActionType.failure(errorResponse));
      return;
    }

    yield put(documentCancelActionType.success(response));
  });

  yield takeEvery(getType(documentCancelDiscardActionType.request), function* ({
    payload
  }: ActionType<typeof documentCancelDiscardActionType.request>) {
    const { nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_CANCEL_DISCARD,
      "POST",
      {
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentCancelDiscardActionType.failure(errorResponse));
      return;
    }

    yield put(documentCancelDiscardActionType.success(response));
  });

  yield takeEvery(getType(documentSaveAndUpdateActionType.request), function* ({
    payload
  }: ActionType<typeof documentSaveAndUpdateActionType.request>) {
    const { payload: actionPayload, registerAction, updateAction } = payload;

    yield put(updateAction.request(actionPayload));

    const [updateActionError] = yield race([
      take(updateAction.failure),
      take(updateAction.success)
    ]);

    if (updateActionError) {
      yield put(
        documentSaveAndUpdateActionType.failure(updateActionError.payload)
      );
      return;
    }

    yield put(registerAction.request(actionPayload));

    const [registerActionSuccess, registerActionError] = yield race([
      take(registerAction.success),
      take(registerAction.failure)
    ]);

    if (updateActionError || registerActionError) {
      yield put(
        documentSaveAndUpdateActionType.failure(registerActionError.payload)
      );
      return;
    }

    yield put(
      documentSaveAndUpdateActionType.success(
        convertResponse(registerActionSuccess)
      )
    );
  });

  yield takeEvery(getType(documentAcceptActionType.request), function* ({
    payload
  }: ActionType<typeof documentAcceptActionType.request>) {
    const { nodeId, nodeType } = payload;

    yield put(openModalLoadingAction());

    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.OWNER_ACCEPT,
      "POST",
      {
        urlWildCards: {
          documentId: nodeId,
          nodeType: nodeTypeSuffix
        }
      }
    );

    if (!success) {
      yield put(documentAcceptActionType.failure(errorResponse));
      yield put(closeModalLoadingAction());
      return;
    }

    yield put(closeModalLoadingAction());
    yield put(documentAcceptActionType.success(response));
  });

  yield takeEvery(getType(documentLostDestroyedActionType.request), function* ({
    payload
  }: ActionType<typeof documentLostDestroyedActionType.request>) {
    const { nodeId, body } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_LOST_DESTROYED,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentLostDestroyedActionType.failure(errorResponse));
      return;
    }

    yield put(documentLostDestroyedActionType.success());
  });

  yield takeEvery(getType(documentRecoverActionType.request), function* ({
    payload
  }: ActionType<typeof documentRecoverActionType.request>) {
    const { body } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_RECOVER,
      "POST",
      {
        bodyJSON: body
      }
    );

    if (!success) {
      yield put(documentRecoverActionType.failure(errorResponse));
      return;
    }

    if (response && response.length) {
      yield put(
        documentRecoverActionType.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(documentRecoverActionType.success());
  });

  yield takeEvery(getType(documentFoundActionType.request), function* ({
    payload
  }: ActionType<typeof documentFoundActionType.request>) {
    const { body } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_FOUND,
      "POST",
      {
        bodyJSON: body.ids
      }
    );

    if (!success) {
      yield put(documentFoundActionType.failure(errorResponse));
      return;
    }

    if (response && response.length) {
      yield put(
        documentFoundActionType.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(documentFoundActionType.success());
  });

  yield takeEvery(getType(documentAddToFavoriteAction.request), function* ({
    payload
  }: ActionType<typeof documentAddToFavoriteAction.request>) {
    const { ids } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_ADD_TO_FAVORITE,
      "POST",
      {
        bodyJSON: ids
      }
    );

    if (!success) {
      yield put(documentAddToFavoriteAction.failure(errorResponse));
      return;
    }

    if (response && response.length) {
      yield put(
        documentAddToFavoriteAction.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(documentAddToFavoriteAction.success());
  });

  yield takeEvery(
    getType(documentRemoveFromFavoriteAction.request),
    function* ({
      payload
    }: ActionType<typeof documentRemoveFromFavoriteAction.request>) {
      const { ids } = payload;

      const { errorResponse, response, success } = yield call(
        fetchSaga,
        ApiURL.DOCUMENT_REMOVE_FROM_FAVORITE,
        "POST",
        {
          bodyJSON: ids
        }
      );

      if (!success) {
        yield put(documentRemoveFromFavoriteAction.failure(errorResponse));
        return;
      }

      if (response && response.length) {
        yield put(
          documentRemoveFromFavoriteAction.failure({
            code: null,
            ids: response,
            message: null
          })
        );
        return;
      }

      yield put(documentRemoveFromFavoriteAction.success());
    }
  );

  yield takeEvery(
    getType(documentSaveReasonFormActionType.request),
    function* ({
      payload
    }: ActionType<typeof documentSaveReasonFormActionType.request>) {
      const { nodeId, body, url, nodeType } = payload;

      const { errorResponse, success } = yield call(fetchSaga, url, "POST", {
        bodyJSON: body,
        urlWildCards: {
          nodeId,
          ...(nodeType && { nodeType })
        }
      });

      if (!success) {
        yield put(documentSaveReasonFormActionType.failure(errorResponse));
        return;
      }

      yield put(documentSaveReasonFormActionType.success());
    }
  );

  yield takeEvery(getType(documentForSignatureActionType.request), function* ({
    payload
  }: ActionType<typeof documentForSignatureActionType.request>) {
    const { body, nodeId } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_FOR_SIGNATURE,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentForSignatureActionType.failure(errorResponse));
      return;
    }

    yield put(documentForSignatureActionType.success(response));
  });

  yield takeEvery(getType(documentFromSignatureActionType.request), function* ({
    payload
  }: ActionType<typeof documentFromSignatureActionType.request>) {
    const { nodeId } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_FROM_SIGNATURE,
      "POST",
      {
        bodyJSON: {},
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentFromSignatureActionType.failure(errorResponse));
      return;
    }

    yield put(documentFromSignatureActionType.success(response));
  });

  yield takeEvery(getType(documentSettleActionType.request), function* ({
    payload
  }: ActionType<typeof documentSettleActionType.request>) {
    const { nodeId, body } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_SETTLE,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentSettleActionType.failure(errorResponse));
      return;
    }

    yield put(documentSettleActionType.success(response));
  });

  yield takeEvery(getType(documentRevertVersionActionType.request), function* ({
    payload
  }: ActionType<typeof documentRevertVersionActionType.request>) {
    const { nodeId, versionId } = payload;
    const { errorResponse, success, response } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_REVERT,
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
      yield put(documentRevertVersionActionType.failure(errorResponse));
      return;
    }

    yield put(documentRevertVersionActionType.success(response));
  });

  yield takeEvery(getType(documentChangeFileMarkAction.request), function* ({
    payload
  }: ActionType<typeof documentChangeFileMarkAction.request>) {
    const { fileMark, nodeId } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_CHANGE_FILE_MARK,
      "POST",
      {
        bodyJSON: {
          fileMark
        },
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentChangeFileMarkAction.failure(errorResponse));
      return;
    }

    yield put(documentChangeFileMarkAction.success());
  });

  yield takeEvery(getType(documentBorrowActionType.request), function* ({
    payload
  }: ActionType<typeof documentBorrowActionType.request>) {
    const { body, nodeId } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_BORROW,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentBorrowActionType.failure(errorResponse));
      return;
    }

    yield put(documentBorrowActionType.success(response));
  });

  yield takeEvery(getType(documentChangeToAAction.request), function* ({
    payload
  }: ActionType<typeof documentChangeToAAction.request>) {
    const { nodeId } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_CHANGE_TO_A,
      "POST",
      {
        bodyJSON: {},
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentChangeToAAction.failure(errorResponse));
      return;
    }

    yield put(documentChangeToAAction.success());
  });

  yield takeEvery(
    getType(documentShreddingDiscardActionType.request),
    function* ({
      payload
    }: ActionType<typeof documentShreddingDiscardActionType.request>) {
      const { body, nodeId } = payload;
      const { errorResponse, response, success } = yield call(
        fetchSaga,
        ApiURL.DOCUMENT_SHREDDING_DISCARD,
        "POST",
        {
          bodyJSON: body,
          urlWildCards: {
            nodeId
          }
        }
      );

      if (!success) {
        yield put(documentShreddingDiscardActionType.failure(errorResponse));
        return;
      }

      yield put(documentShreddingDiscardActionType.success(response));
    }
  );

  yield takeEvery(
    getType(documentChangeLocationActionType.request),
    function* ({
      payload
    }: ActionType<typeof documentChangeLocationActionType.request>) {
      const { nodeId, body } = payload;
      const { errorResponse, success, response } = yield call(
        fetchSaga,
        ApiURL.DOCUMENT_CHANGE_LOCATION,
        "POST",
        {
          bodyJSON: body,
          urlWildCards: {
            nodeId
          }
        }
      );

      if (!success) {
        yield put(documentChangeLocationActionType.failure(errorResponse));
        return;
      }

      yield put(documentChangeLocationActionType.success(response));
    }
  );

  yield takeEvery(getType(documentChangeToSAction.request), function* ({
    payload
  }: ActionType<typeof documentChangeToSAction.request>) {
    const { nodeId } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_CHANGE_TO_S,
      "POST",
      {
        bodyJSON: {},
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(documentChangeToSAction.failure(errorResponse));
      return;
    }

    yield put(documentChangeToSAction.success());
  });
}
