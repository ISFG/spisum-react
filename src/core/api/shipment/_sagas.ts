import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { convertResponse } from "../../../share/utils/convert";
import { fetchSaga } from "../../../share/utils/fetch";
import { isEmptyString } from "../../../share/utils/utils";
import { ApiURL } from "../../apiURL";
import {
  databoxShipmentDetailSaveActionType,
  dispatchPostShipment,
  dispatchPublishShipment,
  emailShipmentDetailSaveActionType,
  personallyShipmentDetailSaveActionType,
  postShipmentDetailSaveActionType,
  publishShipmentDetailSaveActionType,
  shipmentHistoryAction,
  shipmentResendAction
} from "./_action";
import { ShipmentHistorySuccessResponseType } from "./_types";

export function* watchShipmentActions() {
  yield takeLatest(getType(shipmentHistoryAction.request), function* ({
    payload
  }: ActionType<typeof shipmentHistoryAction.request>) {
    if (isEmptyString(payload.nodeId)) {
      yield put(shipmentHistoryAction.failure({ code: "400", message: null }));
      return;
    }

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.SHIPMENT_HISTORY,
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
      yield put(shipmentHistoryAction.failure(errorResponse));
      return;
    }
    yield put(
      shipmentHistoryAction.success(
        convertResponse<ShipmentHistorySuccessResponseType>(response)
      )
    );
  });

  yield takeLatest(getType(dispatchPublishShipment.request), function* ({
    payload
  }: ActionType<typeof dispatchPublishShipment.request>) {
    const { nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.SHIPMENT_DISPATCH_PUBLISH,
      "POST",
      {
        bodyJSON: [nodeId]
      }
    );

    if (!success || response?.length) {
      yield put(dispatchPublishShipment.failure(errorResponse || response));
      return;
    }

    yield put(dispatchPublishShipment.success(response));
  });

  yield takeLatest(getType(shipmentResendAction.request), function* ({
    payload
  }: ActionType<typeof shipmentResendAction.request>) {
    const { nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.SHIPMENT_RESEND,
      "POST",
      {
        bodyJSON: [nodeId]
      }
    );

    if (!success) {
      yield put(shipmentResendAction.failure(errorResponse));
      return;
    }
    yield put(shipmentResendAction.success(response));
  });

  yield takeLatest(getType(dispatchPostShipment.request), function* ({
    payload
  }: ActionType<typeof dispatchPostShipment.request>) {
    const { body, nodeId } = payload;

    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.SHIPMENT_DISPATCH_POST,
      "POST",
      {
        bodyJSON: body,
        urlWildCards: {
          nodeId
        }
      }
    );

    if (!success) {
      yield put(dispatchPostShipment.failure(errorResponse));
      return;
    }

    yield put(dispatchPostShipment.success(response));
  });

  yield takeEvery(
    getType(publishShipmentDetailSaveActionType.request),
    function* ({
      payload
    }: ActionType<typeof publishShipmentDetailSaveActionType.request>) {
      const { nodeId, body } = payload;
      const { errorResponse, success } = yield call(
        fetchSaga,
        ApiURL.PUBLISH_SHIPMENT_UPDATE,
        "POST",
        {
          bodyJSON: body,
          urlWildCards: {
            nodeId
          }
        }
      );

      if (!success) {
        yield put(publishShipmentDetailSaveActionType.failure(errorResponse));
        return;
      }

      yield put(publishShipmentDetailSaveActionType.success());
    }
  );

  yield takeEvery(
    getType(postShipmentDetailSaveActionType.request),
    function* ({
      payload
    }: ActionType<typeof postShipmentDetailSaveActionType.request>) {
      const { nodeId, body } = payload;
      const { errorResponse, success } = yield call(
        fetchSaga,
        ApiURL.POST_SHIPMENT_UPDATE,
        "POST",
        {
          bodyJSON: body,
          urlWildCards: {
            nodeId
          }
        }
      );

      if (!success) {
        yield put(postShipmentDetailSaveActionType.failure(errorResponse));
        return;
      }

      yield put(postShipmentDetailSaveActionType.success());
    }
  );

  yield takeEvery(
    getType(personallyShipmentDetailSaveActionType.request),
    function* ({
      payload
    }: ActionType<typeof personallyShipmentDetailSaveActionType.request>) {
      const { nodeId, body } = payload;
      const { errorResponse, success } = yield call(
        fetchSaga,
        ApiURL.PERSONALLY_SHIPMENT_UPDATE,
        "POST",
        {
          bodyJSON: body,
          urlWildCards: {
            nodeId
          }
        }
      );

      if (!success) {
        yield put(
          personallyShipmentDetailSaveActionType.failure(errorResponse)
        );
        return;
      }

      yield put(personallyShipmentDetailSaveActionType.success());
    }
  );

  yield takeEvery(
    getType(emailShipmentDetailSaveActionType.request),
    function* ({
      payload
    }: ActionType<typeof emailShipmentDetailSaveActionType.request>) {
      const { nodeId, body } = payload;
      const { errorResponse, success } = yield call(
        fetchSaga,
        ApiURL.EMAIL_SHIPMENT_UPDATE,
        "POST",
        {
          bodyJSON: body,
          urlWildCards: {
            nodeId
          }
        }
      );

      if (!success) {
        yield put(emailShipmentDetailSaveActionType.failure(errorResponse));
        return;
      }

      yield put(emailShipmentDetailSaveActionType.success());
    }
  );

  yield takeEvery(
    getType(databoxShipmentDetailSaveActionType.request),
    function* ({
      payload
    }: ActionType<typeof databoxShipmentDetailSaveActionType.request>) {
      const { nodeId, body } = payload;
      const { errorResponse, success } = yield call(
        fetchSaga,
        ApiURL.DATABOX_SHIPMENT_UPDATE,
        "POST",
        {
          bodyJSON: body,
          urlWildCards: {
            nodeId
          }
        }
      );

      if (!success) {
        yield put(databoxShipmentDetailSaveActionType.failure(errorResponse));
        return;
      }

      yield put(databoxShipmentDetailSaveActionType.success());
    }
  );
}
