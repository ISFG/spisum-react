import { createShipmentsAction, shipmentsAction } from "core/api/node/_actions";
import { ApiURL } from "core/apiURL";
import {
  transformDocumentShipmentsPayload,
  transformDocumentShipmentsRequestPayload
} from "core/mappers/api/document";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { convertResponse, getPropertySortName } from "share/utils/convert";
import { ActionType, getType } from "typesafe-actions";
import { SpisumNodeTypes } from "../../../../enums";
import { fetchSaga } from "../../../utils/fetch";
import { returnShipmentAction } from "../returnShipment/_actions";
import { sendShipmentAction } from "./_actions";
import { ShipmentsSuccessType } from "./_types";

export const sendModeTypes = {
  [SpisumNodeTypes.Document]: "document",
  [SpisumNodeTypes.File]: "file"
};

export function* watchShipmentsAction() {
  yield takeEvery(getType(shipmentsAction.request), function* ({
    payload
  }: ActionType<typeof shipmentsAction.request>) {
    const {
      assocType,
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
          include: "properties",
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
      yield put(shipmentsAction.failure(errorResponse.payload));
      return;
    }

    yield put(
      shipmentsAction.success({
        [assocType]: {
          ...transformDocumentShipmentsPayload(convertResponse(response)),
          loading: false
        }
      } as ShipmentsSuccessType)
    );
  });

  yield takeLatest(getType(createShipmentsAction.request), function* ({
    payload
  }: ActionType<typeof createShipmentsAction.request>) {
    const { sendMode, nodeId, nodeType } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.SHIPMENT_CREATE,
      "POST",
      {
        bodyJSON: transformDocumentShipmentsRequestPayload(sendMode, payload),
        urlWildCards: {
          nodeId,
          nodeType: sendModeTypes[nodeType],
          sendMode
        }
      }
    );

    if (!success) {
      yield put(createShipmentsAction.failure(errorResponse.payload));
      return;
    }

    yield put(createShipmentsAction.success(response));
  });

  yield takeLatest(getType(sendShipmentAction.request), function* ({
    payload
  }: ActionType<typeof sendShipmentAction.request>) {
    const { shipmentsId, nodeId, shipmentType } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.SHIPMENT_SEND,
      "POST",
      {
        bodyJSON: shipmentsId,
        urlWildCards: {
          nodeId,
          shipmentType: sendModeTypes[shipmentType]
        }
      }
    );

    if (!success) {
      yield put(sendShipmentAction.failure(errorResponse.payload));
      return;
    }

    yield put(sendShipmentAction.success(response));
  });

  yield takeLatest(getType(returnShipmentAction.request), function* ({
    payload
  }: ActionType<typeof returnShipmentAction.request>) {
    const { nodeId, reason } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.SHIPMENT_RETURN,
      "POST",
      {
        bodyJSON: {
          ids: [nodeId],
          reason
        },
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success || response?.length) {
      yield put(
        returnShipmentAction.failure(errorResponse?.payload || response)
      );
      return;
    }

    yield put(returnShipmentAction.success(response));
  });
}
