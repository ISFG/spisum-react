import { ApiURL } from "core/apiURL";
import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { convertProps } from "../../../share/utils/convert";
import { pickFileProps } from "../../mappers/api/file";
import {
  addFileAction,
  cancelFileAction,
  closeFileAction,
  createFileAction,
  fileBorrowAction,
  fileCancelDiscardActionType,
  fileChangeFileMarkAction,
  fileChangeLocationAction,
  fileChangeToAAction,
  fileChangeToSAction,
  fileDocumentAddToFavoriteAction,
  fileDocumentRemoveFromFavoriteAction,
  fileShreddingDiscardAction,
  foundFilesAction,
  lostDestroyedFileAction,
  recoverFileAction,
  removeFromFileAction,
  updateFileAction
} from "./_actions";

export function* watchApiFileActions() {
  yield takeEvery(getType(createFileAction.request), function* ({
    payload
  }: ActionType<typeof createFileAction.request>) {
    const { documentId } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.FILE_CREATE,
      "POST",
      {
        bodyJSON: {
          documentId
        }
      }
    );

    if (!success) {
      yield put(createFileAction.failure(errorResponse));
      return;
    }

    yield put(createFileAction.success());
  });

  yield takeEvery(getType(addFileAction.request), function* ({
    payload
  }: ActionType<typeof addFileAction.request>) {
    const { documentIds, nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.FILE_DOCUMENT_ADD,
      "POST",
      {
        bodyJSON: documentIds,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(addFileAction.failure(errorResponse));
      return;
    }

    if (Array.isArray(response) && response.length !== 0) {
      yield put(
        addFileAction.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(addFileAction.success());
  });

  yield takeEvery(getType(cancelFileAction.request), function* ({
    payload
  }: ActionType<typeof cancelFileAction.request>) {
    const { nodeId, body } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.FILE_CANCEL,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(cancelFileAction.failure(errorResponse));
      return;
    }

    yield put(cancelFileAction.success());
  });
  yield takeEvery(getType(fileCancelDiscardActionType.request), function* ({
    payload
  }: ActionType<typeof fileCancelDiscardActionType.request>) {
    const { nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.FILE_CANCEL_DISCARD,
      "POST",
      {
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(fileCancelDiscardActionType.failure(errorResponse));
      return;
    }

    yield put(fileCancelDiscardActionType.success(response));
  });

  yield takeEvery(getType(closeFileAction.request), function* ({
    payload
  }: ActionType<typeof closeFileAction.request>) {
    const { nodeId, body } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.FILE_CLOSE,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(closeFileAction.failure(errorResponse));
      return;
    }

    yield put(closeFileAction.success());
  });

  yield takeEvery(getType(lostDestroyedFileAction.request), function* ({
    payload
  }: ActionType<typeof lostDestroyedFileAction.request>) {
    const { nodeId, body } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.FILE_LOST_DESTROYED,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(lostDestroyedFileAction.failure(errorResponse));
      return;
    }

    yield put(lostDestroyedFileAction.success());
  });

  yield takeEvery(getType(recoverFileAction.request), function* ({
    payload
  }: ActionType<typeof recoverFileAction.request>) {
    const { body } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.FILE_RECOVER,
      "POST",
      {
        bodyJSON: body
      }
    );

    if (!success) {
      yield put(recoverFileAction.failure(errorResponse));
      return;
    }

    if (response && response.length) {
      yield put(
        recoverFileAction.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(recoverFileAction.success());
  });

  yield takeEvery(getType(foundFilesAction.request), function* ({
    payload
  }: ActionType<typeof foundFilesAction.request>) {
    const { body } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.FILE_FOUND,
      "POST",
      {
        bodyJSON: body.ids
      }
    );

    if (response && response.length) {
      yield put(foundFilesAction.failure(response));
      return;
    }

    if (!success) {
      yield put(foundFilesAction.failure(errorResponse));
      return;
    }

    yield put(foundFilesAction.success());
  });

  yield takeEvery(getType(fileDocumentAddToFavoriteAction.request), function* ({
    payload
  }: ActionType<typeof fileDocumentAddToFavoriteAction.request>) {
    const { ids } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.FILE_ADD_TO_FAVORITE,
      "POST",
      {
        bodyJSON: ids
      }
    );

    if (!success) {
      yield put(fileDocumentAddToFavoriteAction.failure(errorResponse));
      return;
    }

    if (response && response.length) {
      yield put(
        fileDocumentAddToFavoriteAction.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(fileDocumentAddToFavoriteAction.success());
  });

  yield takeEvery(
    getType(fileDocumentRemoveFromFavoriteAction.request),
    function* ({
      payload
    }: ActionType<typeof fileDocumentRemoveFromFavoriteAction.request>) {
      const { ids } = payload;

      const { errorResponse, response, success } = yield call(
        fetchSaga,
        ApiURL.FILE_REMOVE_FROM_FAVORITE,
        "POST",
        {
          bodyJSON: ids
        }
      );

      if (!success) {
        yield put(fileDocumentRemoveFromFavoriteAction.failure(errorResponse));
        return;
      }

      if (response && response.length) {
        yield put(
          fileDocumentRemoveFromFavoriteAction.failure({
            code: null,
            ids: response,
            message: null
          })
        );
        return;
      }

      yield put(fileDocumentRemoveFromFavoriteAction.success());
    }
  );

  yield takeEvery(getType(removeFromFileAction.request), function* ({
    payload
  }: ActionType<typeof removeFromFileAction.request>) {
    const { nodeId, componentsIds } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_REMOVE_FROM_FILE,
      "POST",
      {
        bodyJSON: componentsIds,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(removeFromFileAction.failure(errorResponse));
      return;
    }

    yield put(removeFromFileAction.success());
  });

  yield takeEvery(getType(updateFileAction.request), function* ({
    payload
  }: ActionType<typeof updateFileAction.request>) {
    const { nodeId, properties } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.FILE_UPDATE,
      "POST",
      {
        bodyJSON: {
          properties: convertProps(pickFileProps(properties))
        },
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(updateFileAction.failure(errorResponse));
      return;
    }

    yield put(updateFileAction.success());
  });

  yield takeEvery(getType(fileChangeFileMarkAction.request), function* ({
    payload
  }: ActionType<typeof fileChangeFileMarkAction.request>) {
    const { nodeId, fileMark } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.FILE_CHANGE_FILE_MARK,
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
      yield put(fileChangeFileMarkAction.failure(errorResponse));
      return;
    }

    yield put(fileChangeFileMarkAction.success());
  });

  yield takeEvery(getType(fileBorrowAction.request), function* ({
    payload
  }: ActionType<typeof fileBorrowAction.request>) {
    const { body, nodeId } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.FILE_BORROW,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(fileBorrowAction.failure(errorResponse));
      return;
    }

    yield put(fileBorrowAction.success(response));
  });

  yield takeEvery(getType(fileChangeToAAction.request), function* ({
    payload
  }: ActionType<typeof fileChangeToAAction.request>) {
    const { nodeId } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.FILE_CHANGE_TO_A,
      "POST",
      {
        bodyJSON: {},
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(fileChangeToAAction.failure(errorResponse));
      return;
    }

    yield put(fileChangeToAAction.success());
  });

  yield takeEvery(getType(fileShreddingDiscardAction.request), function* ({
    payload
  }: ActionType<typeof fileShreddingDiscardAction.request>) {
    const { body, nodeId } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.FILE_SHREDDING_DISCARD,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(fileShreddingDiscardAction.failure(errorResponse));
      return;
    }

    yield put(fileShreddingDiscardAction.success(response));
  });

  yield takeEvery(getType(fileChangeLocationAction.request), function* ({
    payload
  }: ActionType<typeof fileChangeLocationAction.request>) {
    const { nodeId, body } = payload;
    const { errorResponse, success, response } = yield call(
      fetchSaga,
      ApiURL.FILE_CHANGE_LOCATION,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(fileChangeLocationAction.failure(errorResponse));
      return;
    }

    yield put(fileChangeLocationAction.success(response));
  });

  yield takeEvery(getType(fileChangeToSAction.request), function* ({
    payload
  }: ActionType<typeof fileChangeToSAction.request>) {
    const { nodeId } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.FILE_CHANGE_TO_S,
      "POST",
      {
        bodyJSON: {},
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(fileChangeToSAction.failure(errorResponse));
      return;
    }
    yield put(fileChangeToSAction.success());
  });
}
