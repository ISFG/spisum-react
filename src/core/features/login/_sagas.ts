import { push } from "connected-react-router";
import { databoxAccountsAction } from "core/api/databox/_actions";
import { emailAccountsAction } from "core/api/email/_actions";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { CoreRoutes } from "core/routes";
import intersectionWith from "lodash/intersectionWith";
import { all, call, put, select, take, takeLatest } from "redux-saga/effects";
import { secretEncrypt } from "share/utils/byteOperations";
import { convertResponse } from "share/utils/convert";
import { fetchSaga } from "share/utils/fetch";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import { RootStateType } from "../../../reducers";
import { ApiURL } from "../../apiURL";
import {
  allGroupsAction,
  codeListsAction,
  codeListsShreaddingPlanAction,
  loginAction,
  loginKeepAction,
  loginSetSessionTokenAction,
  pathsInfoAction,
  userGroupAction,
  userInfoAction
} from "./_actions";
import { UserGroupType } from "./_types";

export function* watchAllGroupsAction() {
  yield takeLatest(getType(allGroupsAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.GROUPS_ALL,
      "GET"
    );

    if (!success) {
      yield put(allGroupsAction.failure(errorResponse));
      return;
    }

    yield put(allGroupsAction.success(response));
  });
}

export function* watchLoginAction() {
  yield takeLatest(getType(loginAction.request), function* ({
    payload
  }: ActionType<typeof loginAction.request>) {
    const { password, remember, username } = payload;
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.LOGIN,
      "POST",
      {
        params: {
          password,
          username
        }
      }
    );

    if (!success) {
      yield put(loginAction.failure(errorResponse));
      return;
    }

    if (!response.token) {
      yield put(loginAction.failure(errorResponse));
      yield put(
        notificationAction({
          message: t(translationPath(lang.login.error)),
          severity: NotificationSeverity.Error
        })
      );
      return;
    }

    yield put(
      loginSetSessionTokenAction({
        isAdmin: response.isAdmin,
        token: response.token
      })
    );

    if (!response.isAdmin) {
      yield put(allGroupsAction.request()); // all groups
      yield put(codeListsAction.request());
      yield put(codeListsShreaddingPlanAction.request());
      yield put(databoxAccountsAction.request());
      yield put(emailAccountsAction.request());
      yield put(pathsInfoAction.request());
      yield put(userInfoAction.request());

      yield all([
        take(getType(allGroupsAction.success)),
        take(getType(codeListsAction.success)),
        take(getType(codeListsShreaddingPlanAction.success)),
        take(getType(pathsInfoAction.success)),
        take(getType(userInfoAction.success))
      ]);

      yield put(userGroupAction.request()); // user groups
      yield take(getType(userGroupAction.success));
    }

    yield put(
      loginAction.success({
        ...response,
        remember:
          (remember && {
            password: secretEncrypt(password),
            username: secretEncrypt(username)
          }) ||
          null
      })
    );

    yield put(push(CoreRoutes.DASHBOARD));
  });
}

export function* watchCodeListsAction() {
  yield takeLatest(getType(codeListsAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.CODE_LISTS_ALL,
      "GET"
    );

    if (!success) {
      yield put(codeListsAction.failure(errorResponse));
      return;
    }

    yield put(codeListsAction.success(response));
  });

  yield takeLatest(
    getType(codeListsShreaddingPlanAction.request),
    function* () {
      const { errorResponse, response, success } = yield call(
        fetchSaga,
        ApiURL.CODE_LISTS_SHREDDING_PLANS,
        "GET"
      );

      if (!success) {
        yield put(codeListsShreaddingPlanAction.failure(errorResponse));
        return;
      }

      yield put(codeListsShreaddingPlanAction.success(response));
    }
  );
}

export function* watchLoginKeepAction() {
  yield takeLatest(getType(loginKeepAction.request), function* () {
    const { errorResponse, status, success } = yield call(
      fetchSaga,
      ApiURL.VALIDATE,
      "GET"
    );

    if (!success && status !== 401) {
      yield put(loginKeepAction.failure(errorResponse));
      return;
    }

    yield put(loginKeepAction.success());
  });
}

export function* watchPathsInfoAction() {
  yield takeLatest(getType(pathsInfoAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.PATHS_INFO,
      "GET"
    );

    if (!success) {
      yield put(pathsInfoAction.failure(errorResponse));
      return;
    }

    yield put(pathsInfoAction.success(response));
  });
}

export function* watchUserInfoAction() {
  yield takeLatest(getType(userInfoAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.USER_INFO,
      "GET",
      {
        urlWildCards: {
          personId: "-me-"
        }
      }
    );

    if (!success) {
      yield put(userInfoAction.failure(errorResponse));
      return;
    }

    yield put(userInfoAction.success(convertResponse(response)));
  });
}

export function* watchUserGroupAction() {
  yield takeLatest(getType(userGroupAction.request), function* () {
    const { errorResponse, response, success } = yield call(
      fetchSaga,
      ApiURL.USER_GROUPS,
      "GET",
      {
        urlWildCards: {
          personId: "-me-"
        }
      }
    );

    if (!success) {
      yield put(userGroupAction.failure(errorResponse));
      return;
    }

    const allGroups = yield select(
      (state: RootStateType) => state.loginReducer?.global?.groups?.main
    );

    const userGroups = response?.list?.entries?.map(
      (entity: { entry: UserGroupType }) => entity.entry
    );

    const filteredGroups = intersectionWith(
      userGroups,
      allGroups,
      (actionEntity: UserGroupType, allGroupsEntity: UserGroupType) => {
        return allGroupsEntity.id === actionEntity.id;
      }
    );

    yield put(
      userGroupAction.success({ groups: filteredGroups, myGroups: userGroups })
    );
  });
}
