import contentDisposition from "content-disposition";
import { fetchDocument } from "core/action";
import { ApiURL } from "core/apiURL";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { FileDocument } from "core/types";
import { Associations } from "enums";
import produce from "immer";
import mime from "mime-types";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { convertResponse } from "share/utils/convert";
import { fetchSaga } from "share/utils/fetch";
import { translationPath } from "share/utils/getPath";
import { handleResponse } from "share/utils/typesafeActions";
import { isEmptyString } from "share/utils/utils";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { ActionType, getType } from "typesafe-actions";
import { RootStateType } from "../../../reducers";
import { openFileDetailsAction } from "../../components/dialog/tabs/tableOfContents/_actions";
import { dialogOpenAction } from "../../components/dialog/_actions";
import { DialogType } from "../../components/dialog/_types";
import { metaFormAction__Update } from "../../components/MetaForm/_actions";
import { getFileExt } from "../../helpers/file";
import { transformNodePayload } from "../../mappers/api/document";
import { getNodeTypeSuffix } from "../../mappers/api/general";
import {
  nodeCancelShipmentAction,
  nodeChildrenAction,
  nodeContentAction,
  nodeHistoryAction,
  nodeVersionAction,
  tableOfContentsAction
} from "./_actions";
import {
  NodeChildrenSuccessResponseType,
  NodeHistorySuccessResponseType,
  NodeVersionSuccessResponseType
} from "./_types";

export function* watchFetchNodeChildrenAction() {
  yield takeEvery(getType(nodeChildrenAction.request), function* ({
    payload
  }: ActionType<typeof nodeChildrenAction.request>) {
    const {
      fields,
      includeSource = false,
      maxItems = 100,
      nodeId = "-root-",
      orderBy,
      relativePath,
      skipCount = 0,
      where
    } = payload;

    const include = [...(payload.include || []), "properties"];
    const isAdmin = yield select(
      (state: RootStateType) => state.loginReducer.session.isAdmin
    );
    const url = isAdmin ? ApiURL.ADMIN_NODE_CHILDREN : ApiURL.NODE_CHILDREN;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      url,
      "GET",
      {
        params: {
          ...(fields && { fields: fields?.join(",") }),
          ...(include.length && { include: include?.join(",") }),
          ...(includeSource && { includeSource: true }),
          ...(maxItems && { maxItems }),
          ...(orderBy && { orderBy: orderBy?.join(",") }),
          ...(relativePath && { relativePath }),
          ...(skipCount && { skipCount }),
          ...(where && { where })
        } as Record<string, string>,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(nodeChildrenAction.failure(errorResponse));
      return;
    }

    yield put(
      nodeChildrenAction.success(
        convertResponse<NodeChildrenSuccessResponseType>(response)
      )
    );
  });
}

export function* watchNodeHistoryAction() {
  yield takeLatest(getType(nodeHistoryAction.request), function* ({
    payload
  }: ActionType<typeof nodeHistoryAction.request>) {
    if (isEmptyString(payload.nodeId)) {
      yield put(nodeHistoryAction.failure({ code: "400", message: null }));
      return;
    }

    const { maxItems, skipCount, nodeId, nodeType } = payload;
    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.NODE_HISTORY,
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
      yield put(nodeHistoryAction.failure(errorResponse));
      return;
    }

    yield put(
      nodeHistoryAction.success(
        convertResponse<NodeHistorySuccessResponseType>(response)
      )
    );
  });
}

export function* watchNodeContentAction() {
  yield takeEvery(getType(nodeContentAction.request), function* ({
    payload
  }: ActionType<typeof nodeContentAction.request>) {
    const { nodeId, name, nodeType, componentId } = payload;
    const extension = getFileExt(name);

    if (isEmptyString(nodeId) || !extension) {
      yield put(nodeContentAction.failure(payload));
      return;
    }

    const nodeTypeSuffix = getNodeTypeSuffix(nodeType);
    const usePdfThumbnailEndpoint = shouldUseThePdfThumbnailEndpoint(extension);
    const { response, success, responseHeaders } = yield call(
      fetchSaga,
      usePdfThumbnailEndpoint ? ApiURL.NODE_THUMBNAIL_PDF : ApiURL.NODE_CONTENT,
      "GET",
      {
        params: (usePdfThumbnailEndpoint
          ? {}
          : {
              attachment: "false"
            }) as Record<string, string>,
        urlWildCards: {
          componentId: nodeId,
          nodeId: componentId,
          nodeType: nodeTypeSuffix
        }
      }
    );

    if (!success) {
      yield put(nodeContentAction.failure(payload));
      return;
    }

    const disposition = contentDisposition.parse(
      responseHeaders.get("content-disposition")
    );

    const contentType = responseHeaders.get("content-type");

    yield put(
      nodeContentAction.success({
        content: response,
        id: nodeId,
        name: `${disposition.parameters.filename}.${mime.extension(
          contentType
        )}`
      })
    );
  });
}

const SUPPORTED_EXTENSIONS = [
  "doc",
  "docx",
  "eml",
  "xls",
  "xlsx",
  "ppt",
  "pptx"
];
function shouldUseThePdfThumbnailEndpoint(extension: string) {
  return SUPPORTED_EXTENSIONS.includes(extension);
}

export function* watchNodeShipmentAction() {
  yield takeEvery(getType(nodeCancelShipmentAction.request), function* ({
    payload
  }: ActionType<typeof nodeCancelShipmentAction.request>) {
    const { shipmentId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.CANCEL_SHIPMENT,
      "POST",
      {
        bodyJSON: shipmentId
      }
    );

    if (!success) {
      yield put(nodeCancelShipmentAction.failure(errorResponse));
      return;
    }

    yield put(nodeCancelShipmentAction.success(response));
  });
}

export function* watchNodeVersionAction() {
  yield takeLatest(getType(nodeVersionAction.request), function* ({
    payload
  }: ActionType<typeof nodeVersionAction.request>) {
    if (isEmptyString(payload.nodeId)) {
      yield put(nodeVersionAction.failure({ code: "400", message: null }));
      return;
    }

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.NODE_VERSIONS,
      "GET",
      {
        params: {
          maxItems: String(payload.maxItems),
          skipCount: String(payload.skipCount)
        } as Record<string, string>,
        urlWildCards: {
          nodeId: payload.nodeId
        }
      }
    );

    if (!success) {
      yield put(nodeVersionAction.failure(errorResponse));
      return;
    }

    yield put(
      nodeVersionAction.success(
        convertResponse<NodeVersionSuccessResponseType>(response)
      )
    );
  });
}

export const defaultFileFormValues = {
  associationCount: undefined,
  borrowDate: null,
  borrowReturnDate: null,
  closureDate: null,
  createdAt: null,
  createdDate: null,
  customSettleMethod: "",
  fileIdentificator: "",
  fileMark: "",
  filePlan: "",
  form: "",
  group: "",
  owner: "",
  pid: "",
  processor: "",
  retentionMark: "",
  retentionMode: "",
  retentionPeriod: null,
  sender: "",
  senderIdent: "",
  senderSSID: "",
  settleDate: null,
  settleMethod: "",
  settleReason: "",
  settleToDate: null,
  shreddingDate: null,
  ssid: "",
  state: "",
  subject: "",
  toArchiveShreddingDate: null,
  toRepositoryDate: null,
  triggerActionId: "",
  triggerActionYear: ""
};

export function* watchNodeDetailsAction() {
  yield takeLatest(getType(openFileDetailsAction), function* ({
    payload
  }: ActionType<typeof openFileDetailsAction>) {
    const { isReadonly } = payload;
    const document = payload.data as FileDocument;

    yield put(
      fetchDocument.request({
        id: document.id,
        nodeType: document.nodeType
      })
    );

    const [successResponse, , success] = yield handleResponse(fetchDocument);

    if (!success) {
      yield put(
        notificationAction({
          message: t(translationPath(lang.dialog.notifications.actionFailed)),
          severity: NotificationSeverity.Error
        })
      );
      return;
    }

    yield put(
      metaFormAction__Update({
        documentId: successResponse.entry?.id,
        formValues: {
          ...defaultFileFormValues,
          ...successResponse.entry?.properties?.ssl,
          createdAt: successResponse.entry?.createdAt || null,
          owner: successResponse.entry?.properties?.cm?.owner?.displayName || ""
        },
        nodeType: successResponse.entry?.nodeType
      })
    );

    const mergedFormValues = produce(document, (draft: FileDocument) => {
      if (draft?.properties?.ssl) {
        draft.properties.ssl = {
          ...defaultFileFormValues,
          ...draft?.properties?.ssl,
          createdAt: draft.createdAt
        };
      }
    });

    yield put(
      dialogOpenAction({
        dialogProps: {
          ...payload,
          data: mergedFormValues
        },
        dialogType: isReadonly
          ? DialogType.FileDetailsReadonly
          : DialogType.FileDetails
      })
    );
  });

  yield takeLatest(getType(tableOfContentsAction.request), function* ({
    payload
  }: ActionType<typeof tableOfContentsAction.request>) {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.NODE_SECONDARY_CHILDREN,
      "GET",
      {
        params: {
          include: "properties, path",
          maxItems: String(payload.maxItems),
          skipCount: String(payload.skipCount),
          where: `(assocType='${Associations.Documents}')`
        } as Record<string, string>,
        urlWildCards: {
          nodeId: payload.nodeId
        }
      }
    );

    if (!success) {
      yield put(tableOfContentsAction.failure(errorResponse));
      return;
    }

    yield put(
      tableOfContentsAction.success(
        transformNodePayload(convertResponse(response))
      )
    );
  });
}
