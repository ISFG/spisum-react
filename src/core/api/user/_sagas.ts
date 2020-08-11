import produce from "immer";
import { omit } from "lodash";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { lang, t } from "translation/i18n";
import { ActionType, getType } from "typesafe-actions";
import { SpisumGroups } from "../../../enums";
import { RootStateType } from "../../../reducers";
import {
  GroupType,
  UserFormValuesProxy,
  UserFormValuesType
} from "../../../share/components/dialog/createUserDialog/_types";
import { convertResponse } from "../../../share/utils/convert";
import { fetchSaga } from "../../../share/utils/fetch";
import { lastPathMember, translationPath } from "../../../share/utils/getPath";
import { ApiURL } from "../../apiURL";
import { dialogOpenAction } from "../../components/dialog/_actions";
import { DialogType } from "../../components/dialog/_types";
import { documentViewAction__UpdateItem } from "../../components/documentView/_actions";
import { metaFormAction__Update } from "../../components/MetaForm/_actions";
import { notificationAction } from "../../components/notifications/_actions";
import { NotificationSeverity } from "../../components/notifications/_types";
import { mapListResponseToEntityList } from "../../mappers/api/listResponse";
import {
  changePasswordAction,
  createUserAction,
  deactivateUserAction,
  openCreateUserDialogAction,
  openEditUserDialogAction,
  updateUserAction
} from "./_actions";
import { EditUserAssociationType } from "./_types";

const SIGN_SUFFIX = "_Sign";
export const createUserDefaultFormValues: UserFormValuesType = {
  availableGroups: [],
  email: "",
  firstName: "",
  groups: [],
  id: "",
  lastName: "",
  mainGroup: "",
  password: "",
  passwordAgain: "",
  signGroups: [],
  userId: "",
  userJob: "",
  userOrgAddress: "",
  userOrgId: "",
  userOrgName: "",
  userOrgUnit: ""
};

export function* watchUserActions() {
  yield takeEvery(getType(changePasswordAction.request), function* ({
    payload
  }: ActionType<typeof changePasswordAction.request>) {
    const { body } = payload;
    const isAdmin = yield select(
      (state: RootStateType) => state.loginReducer.session.isAdmin
    );
    const url = isAdmin
      ? ApiURL.ADMIN_CHANGE_PASSWORD
      : ApiURL.USER_CHANGE_PASSWORD;
    const { errorResponse, success } = yield call(fetchSaga, url, "POST", {
      bodyJSON: body
    });

    if (!success) {
      yield put(changePasswordAction.failure(errorResponse));
      return;
    }

    yield put(changePasswordAction.success());
  });

  yield takeEvery(getType(createUserAction.request), function* ({
    payload
  }: ActionType<typeof createUserAction.request>) {
    const { body } = payload;

    const { errorResponse, success } = yield call(
      fetchSaga,
      ApiURL.USER_CREATE,
      "POST",
      {
        bodyJSON: omit(body, [
          lastPathMember(UserFormValuesProxy.passwordAgain).path,
          lastPathMember(UserFormValuesProxy.availableGroups).path
        ])
      }
    );

    if (!success) {
      yield put(createUserAction.failure(errorResponse));
      return;
    }

    yield put(createUserAction.success());
  });

  yield takeEvery(getType(deactivateUserAction.request), function* ({
    payload
  }: ActionType<typeof deactivateUserAction.request>) {
    const { userId } = payload;

    const { errorResponse, success, response } = yield call(
      fetchSaga,
      ApiURL.USER_DEACTIVATE,
      "POST",
      {
        urlWildCards: {
          userId
        }
      }
    );

    if (!success) {
      yield put(deactivateUserAction.failure(errorResponse));
      return;
    }

    yield put(documentViewAction__UpdateItem(response));
    yield put(deactivateUserAction.success(response));
  });

  yield takeLatest(getType(openCreateUserDialogAction), function* () {
    yield put(
      dialogOpenAction({
        dialogProps: {
          dontUseDataModifiedDialog: true
        },
        dialogType: DialogType.CreateUser
      })
    );

    const { success, response } = yield call(
      fetchSaga,
      ApiURL.ADMIN_GROUP_MEMBERS,
      "GET",
      {
        params: {
          where: "(memberType='GROUP')"
        },
        urlWildCards: {
          group: SpisumGroups.Main
        }
      }
    );

    if (!success) {
      yield put(
        notificationAction({
          message: t(translationPath(lang.dialog.notifications.actionFailed)),
          severity: NotificationSeverity.Error
        })
      );
      return;
    }

    const availableGroups =
      mapListResponseToEntityList<GroupType, GroupType>(response, (x) => x)
        ?.entities || [];

    yield put(
      metaFormAction__Update({
        documentId: "createUser",
        formValues: { ...createUserDefaultFormValues, availableGroups }
      })
    );
  });

  yield takeLatest(getType(openEditUserDialogAction), function* ({
    payload
  }: ActionType<typeof openEditUserDialogAction>) {
    yield put(
      dialogOpenAction({
        dialogProps: {
          dontUseDataModifiedDialog: true
        },
        dialogType: DialogType.EditUserDialog
      })
    );

    const {
      success: userGroupsSuccess,
      response: userGroupsResponse
    } = yield call(fetchSaga, ApiURL.ADMIN_USERS_GROUPS, "GET", {
      urlWildCards: {
        userId: payload.id
      }
    });

    const {
      success: availableGroupsSuccess,
      response: availableGroupsResponse
    } = yield call(fetchSaga, ApiURL.ADMIN_GROUP_MEMBERS, "GET", {
      params: {
        where: "(memberType='GROUP')"
      },
      urlWildCards: {
        group: SpisumGroups.Main
      }
    });

    if (!userGroupsSuccess || !availableGroupsSuccess) {
      yield put(
        notificationAction({
          message: t(translationPath(lang.dialog.notifications.actionFailed)),
          severity: NotificationSeverity.Error
        })
      );
      return;
    }

    const userGroups = mapListResponseToEntityList<GroupType, GroupType>(
      userGroupsResponse,
      (x) => x
    )?.entities;

    const availableGroups = mapListResponseToEntityList<GroupType, GroupType>(
      availableGroupsResponse,
      (x) => x
    )?.entities;

    const groupsIds = userGroups?.map((grp) => grp.id);

    const groups = groupsIds
      ?.filter((grp) => !grp.includes(SIGN_SUFFIX))
      ?.filter((grp) =>
        availableGroups?.find((availableGrp) => availableGrp.id === grp)
      );

    const signGroups = groupsIds
      ?.filter((grp) => grp.includes(SIGN_SUFFIX))
      ?.map((grp) => grp.replace(SIGN_SUFFIX, ""))
      ?.filter((grp) =>
        availableGroups?.find((availableGrp) => availableGrp.id === grp)
      );

    const mapped = produce(payload, (draft: EditUserAssociationType) => {
      draft.userId = draft?.properties?.ssl?.user_id || "";
      draft.userOrgId = draft?.properties?.ssl?.user_orgId || "";
      draft.userOrgName = draft?.properties?.ssl?.user_orgName || "";
      draft.userOrgUnit = draft?.properties?.ssl?.user_orgUnit || "";
      draft.userJob = draft?.properties?.ssl?.user_job || "";
      draft.userOrgAddress = draft?.properties?.ssl?.user_orgAddress || "";
      draft.mainGroup = draft?.properties?.ssl?.group;
      draft.groups = groups || [];
      draft.availableGroups = availableGroups;
      draft.signGroups = signGroups;
      delete draft.properties;
    });

    yield put(
      metaFormAction__Update({
        documentId: payload.id,
        formValues: { ...createUserDefaultFormValues, ...mapped }
      })
    );
  });

  yield takeEvery(getType(updateUserAction.request), function* ({
    payload
  }: ActionType<typeof updateUserAction.request>) {
    const { body } = payload;

    const { errorResponse, success, response } = yield call(
      fetchSaga,
      ApiURL.USER_UPDATE,
      "POST",
      {
        bodyJSON: omit(body, [
          lastPathMember(UserFormValuesProxy.passwordAgain).path,
          lastPathMember(UserFormValuesProxy.availableGroups).path,
          lastPathMember(UserFormValuesProxy.id).path
        ]),
        urlWildCards: {
          userId: body.id
        }
      }
    );

    if (!success) {
      yield put(updateUserAction.failure(errorResponse));
      return;
    }

    yield put(documentViewAction__UpdateItem(convertResponse(response)));
    yield put(updateUserAction.success());
  });
}
