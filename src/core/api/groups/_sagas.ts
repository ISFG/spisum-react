import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { ApiURL } from "../../apiURL";
import { ErrorResponseType } from "../models";
import { getGroupsResponseMapper } from "./mappers";
import {
  createOrganizationUnitAction,
  deleteOrganizationUnitAction,
  getGroupsAction,
  updateOrganizationUnitAction
} from "./_actions";
import { GetGroupsSuccessType } from "./_types";

export function* watchGetGroups() {
  yield takeEvery(getType(getGroupsAction.request), function* ({
    payload: groupId
  }: ActionType<typeof getGroupsAction.request>) {
    const {
      errorResponse,
      response,
      success
    }: {
      response: GetGroupsSuccessType;
      errorResponse: ErrorResponseType;
      success: boolean;
    } = yield call(fetchSaga, ApiURL.GROUPS, "GET", {
      urlWildCards: { groupId }
    });

    if (!success) {
      yield put(getGroupsAction.failure(errorResponse));
      return;
    }

    yield put(getGroupsAction.success(getGroupsResponseMapper(response)));
  });

  yield takeEvery(getType(createOrganizationUnitAction.request), function* ({
    payload
  }: ActionType<typeof createOrganizationUnitAction.request>) {
    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.ORGANIZATION_UNIT_CREATE,
      "POST",
      {
        bodyJSON: { ...payload }
      }
    );

    if (!success) {
      yield put(createOrganizationUnitAction.failure(errorResponse));
      return;
    }

    yield put(createOrganizationUnitAction.success({}));
  });
  yield takeEvery(getType(updateOrganizationUnitAction.request), function* ({
    payload
  }: ActionType<typeof updateOrganizationUnitAction.request>) {
    const { name, groupId } = payload;
    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.ORGANIZATION_UNIT_UPDATE,
      "POST",
      {
        bodyJSON: { name },
        urlWildCards: { groupId }
      }
    );

    if (!success) {
      yield put(updateOrganizationUnitAction.failure(errorResponse));
      return;
    }

    yield put(updateOrganizationUnitAction.success({}));
  });
  yield takeEvery(getType(deleteOrganizationUnitAction.request), function* ({
    payload
  }: ActionType<typeof deleteOrganizationUnitAction.request>) {
    const { groupId } = payload;
    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.ADMIN_GROUP_DELETE,
      "POST",
      {
        urlWildCards: { group: groupId }
      }
    );

    if (!success) {
      yield put(deleteOrganizationUnitAction.failure(errorResponse));
      return;
    }

    yield put(deleteOrganizationUnitAction.success({}));
  });
}
