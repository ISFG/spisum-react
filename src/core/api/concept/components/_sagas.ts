import contentDisposition from "content-disposition";
import { ApiURL } from "core/apiURL";
import fileDownload from "js-file-download";
import {
  all,
  call,
  put,
  take,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import { convertResponse, getPropertySortName } from "share/utils/convert";
import { fetchSaga, replaceWildCards } from "share/utils/fetch";
import { ActionType, getType, PayloadAction } from "typesafe-actions";
import {
  uploadFailureAction,
  uploadFileWithNotificationAction,
  uploadSuccessAction
} from "../../../features/fileUpload/_actions";
import {
  UploadFailure,
  UploadSuccess
} from "../../../features/fileUpload/_types";
import { getNodeTypeSuffix } from "../../../mappers/api/general";
import { getComponentsResponseMapper } from "../../components/mappers";
import {
  componentCreateAction,
  componentDeleteAction,
  componentDownloadAction,
  componentViewAction
} from "./_actions";

export function* watchApiConceptComponentsSagas() {
  yield takeLatest(getType(componentViewAction.request), function* ({
    payload
  }: ActionType<typeof componentViewAction.request>) {
    const {
      fields,
      include,
      includeSource = false,
      maxItems = 100,
      nodeId = "-root-",
      skipCount = 0,
      sortAsc,
      sortKeys,
      where
    } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.NODE_SECONDARY_CHILDREN,
      "GET",
      {
        params: {
          fields: fields?.join(","),
          include: include?.join(","),
          includeSource: String(includeSource),
          maxItems: String(maxItems),
          skipCount: String(skipCount),
          where,
          ...(sortKeys && {
            orderBy: sortKeys.map(
              (key) =>
                `${getPropertySortName(key)} ${
                sortAsc === true ? "ASC" : "DESC"
                }`
            )
          })
        } as Record<string, string>,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(componentViewAction.failure(errorResponse.payload));
      return;
    }

    yield put(
      componentViewAction.success(
        getComponentsResponseMapper(convertResponse(response))
      )
    );
  });

  const UPLOAD_URLS = {
    create: ApiURL.CONCEPT_COMPONENT_CREATE,
    replace: ApiURL.CONCEPT_COMPONENT_CONTENT
  };

  yield takeEvery(getType(componentCreateAction.request), function* ({
    payload
  }: ActionType<typeof componentCreateAction.request>) {
    const { nodeId, componentId, files, onSuccess, onError, onEnd } = payload;

    const uploads = files.map((f) =>
      put(
        uploadFileWithNotificationAction({
          endpoint: replaceWildCards(
            componentId ? UPLOAD_URLS.replace : UPLOAD_URLS.create,
            {
              nodeId,
              ...(componentId && {
                componentId
              })
            }
          ),
          file: f
        })
      )
    );

    yield all(uploads);

    const isFromThisBatch = (
      action: PayloadAction<string, UploadFailure | UploadSuccess>
    ) => files.indexOf(action.payload.file) !== -1;

    let processedFiles = 0;

    while (true) {
      if (processedFiles === files.length) {
        onEnd?.();
        return;
      }

      const action: PayloadAction<
        string,
        UploadFailure | UploadSuccess
      > = yield take([
        getType(uploadFailureAction),
        getType(uploadSuccessAction)
      ]);

      if (
        action.type === getType(uploadFailureAction) &&
        isFromThisBatch(action)
      ) {
        ++processedFiles;
        onError?.(action.payload.file);

        yield put(
          componentCreateAction.failure({
            code: null,
            message: null
          })
        );
      }

      if (
        action.type === getType(uploadSuccessAction) &&
        isFromThisBatch(action)
      ) {
        ++processedFiles;
        onSuccess?.(action.payload.file);

        yield put(
          componentCreateAction.success({
            file: action.payload.file
          })
        );
      }
    }
  });

  yield takeEvery(getType(componentDeleteAction.request), function* ({
    payload
  }: ActionType<typeof componentDeleteAction.request>) {
    const { componentIds, nodeId } = payload;

    const { errorResponse, success, response } = yield call(
      fetchSaga,
      ApiURL.CONCEPT_COMPONENT_DELETE,
      "POST",
      {
        bodyJSON: componentIds,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(componentDeleteAction.failure(errorResponse.payload));
      return;
    }

    if (response && response.length) {
      yield put(
        componentDeleteAction.failure({
          code: null,
          ids: response,
          message: null
        })
      );
      return;
    }

    yield put(componentDeleteAction.success());
  });

  yield takeEvery(getType(componentDownloadAction.request), function* ({
    payload
  }: ActionType<typeof componentDownloadAction.request>) {
    const { componentIds, nodeType, nodeId } = payload;

    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);

    const { errorResponse, success, response, responseHeaders } = yield call(
      fetchSaga,
      ApiURL.NODES_DOWNLOAD,
      "POST",
      {
        bodyJSON: componentIds,
        urlWildCards: {
          nodeId,
          nodeType: nodeTypeSuffix
        }
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
