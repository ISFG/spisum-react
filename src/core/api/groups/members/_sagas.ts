import { call, put, takeEvery } from "redux-saga/effects";
import { fetchSaga } from "share/utils/fetch";
import { ActionType, getType } from "typesafe-actions";
import { ApiURL } from "../../../apiURL";
import { ErrorResponseType } from "../../models";
import { getGroupMembersResponseMapper } from "./mappers";
import { getGroupMembersAction } from "./_actions";
import { GetGroupMembersSuccessType } from "./_types";

export function* watchGetGroupMembers() {
  yield takeEvery(getType(getGroupMembersAction.request), function* ({
    payload
  }: ActionType<typeof getGroupMembersAction.request>) {
    const { groupId, memberType } = payload;

    const {
      errorResponse,
      response,
      success
    }: {
      response: GetGroupMembersSuccessType;
      errorResponse: ErrorResponseType;
      success: boolean;
    } = yield call(fetchSaga, ApiURL.GROUP_MEMBERS, "GET", {
      params: {
        maxItems: String(100),
        skipCount: String(0),
        ...(memberType && { where: `(memberType%3D'${memberType}')` })
      } as Record<string, string>,
      urlWildCards: {
        groupId
      }
    });

    if (!success) {
      yield put(getGroupMembersAction.failure(errorResponse));
      return;
    }

    yield put(
      getGroupMembersAction.success(getGroupMembersResponseMapper(response))
    );
  });
}
