import contentDisposition from "content-disposition";
import { ApiURL } from "core/apiURL";
import { transformDocumentForApi } from "core/mappers/api/document";
import fileDownload from "js-file-download";
import {
  all,
  call,
  put,
  take,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import {
  convertProps,
  convertResponse,
  getPropertySortName,
  omitFormiddenProps
} from "share/utils/convert";
import { fetchSaga, replaceWildCards } from "share/utils/fetch";
import { ActionType, getType, PayloadAction } from "typesafe-actions";
import {
  uploadFailureAction,
  uploadFileWithNotificationAction,
  uploadSuccessAction
} from "../../features/fileUpload/_actions";
import { UploadFailure, UploadSuccess } from "../../features/fileUpload/_types";
import { getNodeTypeSuffix } from "../../mappers/api/general";
import { SslProperties } from "../models";
import {
  getComponentsResponseMapper,
  getShipmentComponentsResponseMapper,
  updateFileMapper
} from "./mappers";
import {
  componentCreateAction,
  componentDeleteAction,
  componentDownloadAction,
  componentUpdateAction,
  componentViewAction,
  componentViewShipmentAction
} from "./_actions";
import { ComponentType } from "./_types";

export function* watchComponentViewAction() {
  yield takeLatest(getType(componentViewAction.request), function* ({
    payload
  }: ActionType<typeof componentViewAction.request>) {
    const {
      fields,
      includeSource = false,
      maxItems = 100,
      nodeId = "-root-",
      skipCount = 0,
      sortAsc,
      sortKeys,
      where
    } = payload;
    const include = [...(payload.include || []), "properties"];
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.NODE_CHILDREN,
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
}
export function* watchComponentViewShipmentAction() {
  yield takeLatest(getType(componentViewShipmentAction.request), function* ({
    payload
  }: ActionType<typeof componentViewShipmentAction.request>) {
    const { documentId, nodeId = "-root-", where } = payload;
    let parentComponentResponse;
    if (documentId) {
      parentComponentResponse = yield call(
        fetchSaga,
        ApiURL.NODE_SECONDARY_CHILDREN,
        "GET",
        {
          params: {
            where
          } as Record<string, string>,
          urlWildCards: {
            nodeId: documentId
          }
        }
      );
    }
    const mainComponentResponse = yield call(
      fetchSaga,
      ApiURL.NODE_SECONDARY_CHILDREN,
      "GET",
      {
        params: {
          where: "(assocType='ssl:shComponents')"
        } as Record<string, string>,
        urlWildCards: {
          nodeId
        }
      }
    );

    const selected = mainComponentResponse.response;
    const components = !!parentComponentResponse
      ? parentComponentResponse.response
      : selected;
    const componentResponse = {
      components: getShipmentComponentsResponseMapper(
        convertResponse(components)
      ),
      selected: getShipmentComponentsResponseMapper(convertResponse(selected))
    };
    if (!mainComponentResponse.success) {
      yield put(
        componentViewShipmentAction.failure(
          mainComponentResponse.errorResponse.payload
        )
      );
      return;
    }

    yield put(componentViewShipmentAction.success(componentResponse));
  });
}

enum UPLOAD_ACTION_TYPE {
  CREATE = "create",
  REPLACE = "replace"
}

const URLS = {
  [ComponentType.Document]: {
    [UPLOAD_ACTION_TYPE.CREATE]: ApiURL.DOCUMENT_COMPONENT_CREATE,
    [UPLOAD_ACTION_TYPE.REPLACE]: ApiURL.DOCUMENT_COMPONENT_CONTENT
  },
  [ComponentType.Concept]: {
    [UPLOAD_ACTION_TYPE.CREATE]: ApiURL.CONCEPT_COMPONENT_CREATE,
    [UPLOAD_ACTION_TYPE.REPLACE]: ApiURL.CONCEPT_COMPONENT_CONTENT
  }
};

export function* watchComponentCreateAction() {
  yield takeEvery(getType(componentCreateAction.request), function* ({
    payload
  }: ActionType<typeof componentCreateAction.request>) {
    const {
      nodeId,
      files,
      componentId,
      type,
      onSuccess,
      onError,
      onEnd
    } = payload;

    const actionType = componentId
      ? UPLOAD_ACTION_TYPE.REPLACE
      : UPLOAD_ACTION_TYPE.CREATE;

    const urlTemplate = URLS[type] ? URLS[type][actionType] : undefined;

    if (!urlTemplate) {
      return;
    }

    const uploads = files.map((f) =>
      put(
        uploadFileWithNotificationAction({
          endpoint: replaceWildCards(urlTemplate, {
            ...(componentId && {
              componentId
            }),
            nodeId
          }),
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
}

export function* watchComponentDeleteAction() {
  yield takeEvery(getType(componentDeleteAction.request), function* ({
    payload
  }: ActionType<typeof componentDeleteAction.request>) {
    const { componentIds, nodeId } = payload;
    const { errorResponse, success, response } = yield call(
      fetchSaga,
      ApiURL.DOCUMENT_COMPONENT_DELETE,
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
}

export function* watchComponentUpdateAction() {
  yield takeEvery(getType(componentUpdateAction.request), function* ({
    payload
  }: ActionType<typeof componentUpdateAction.request>) {
    const payloadBody = updateFileMapper(payload);
    const { nodeType, documentId } = payload;
    const { body, nodeId } = payloadBody;
    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.COMPONENT_UPDATE,
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
          componentId: nodeId || "",
          nodeId: documentId || "",
          nodeType: nodeTypeSuffix
        }
      }
    );

    if (!success) {
      yield put(componentUpdateAction.failure(errorResponse));
      return;
    }

    yield put(componentUpdateAction.success(response));
  });
}

export function* watchComponentDownloadAction() {
  yield takeEvery(getType(componentDownloadAction.request), function* ({
    payload
  }: ActionType<typeof componentDownloadAction.request>) {
    const { componentIds, nodeId, nodeType } = payload;

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
