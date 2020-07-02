import {
  createSafeAction,
  createSafeAsyncAction
} from "share/utils/typesafeActions";
import { ErrorType } from "types";
import { ActionType } from "typesafe-actions";
import {
  AllGroupType,
  CodeList,
  LoginRequestType,
  LoginResponseType,
  LoginSetSessionType,
  ShreddingPlan,
  SslPathsType,
  UserGroupType,
  UserInfoResponseType
} from "./_types";

export const allGroupsAction = createSafeAsyncAction(
  "@allGroupAction/REQUEST",
  "@allGroupAction/SUCESS",
  "@allGroupAction/FAILURE"
)<void, AllGroupType, ErrorType>();

export const codeListsAction = createSafeAsyncAction(
  "@codeLists/ALL_REQUEST",
  "@codeLists/ALL_SUCESS",
  "@codeLists/ALL_FAILURE"
)<void, CodeList[], ErrorType>();

export const codeListsShreaddingPlanAction = createSafeAsyncAction(
  "@codeLists/SHREDDING_PLANS_REQUEST",
  "@codeLists/SHREDDING_PLANS_SUCESS",
  "@codeLists/SHREDDING_PLANS_FAILURE"
)<void, ShreddingPlan[], ErrorType>();

export const loginAction = createSafeAsyncAction(
  "@login/LOGIN_ACTION_REQUEST",
  "@login/LOGIN_ACTION_SUCESS",
  "@login/LOGIN_ACTION_FAILURE"
)<LoginRequestType, LoginResponseType, ErrorType>();

export const loginAction__ClearError = createSafeAction(
  "@login/LOGIN_ACTION_CLEAR_ERROR"
)();

export const loginKeepAction = createSafeAsyncAction(
  "@login/LOGIN_KEEP_ACTION_REQUEST",
  "@login/LOGIN_KEEP_ACTION_SUCESS",
  "@login/LOGIN_KEEP_ACTION_FAILURE"
)<void, void, ErrorType>();

export const loginSetSessionTokenAction = createSafeAction(
  "@login/SET_SESSION_TOKEN"
)<LoginSetSessionType>();

export const loginUpdateExpireInAction = createSafeAction(
  "@login/UPDATE_EXPIRE"
)();

export const pathsInfoAction = createSafeAsyncAction(
  "@pathsInfo/REQUEST",
  "@pathsInfo/SUCESS",
  "@pathsInfo/FAILURE"
)<void, SslPathsType[], ErrorType>();

export const setActiveGroupAction = createSafeAction("@user/ACTIVE_GROUP")<
  string
>();

export const userInfoAction = createSafeAsyncAction(
  "@userInfo/REQUEST",
  "@userInfo/SUCESS",
  "@userInfo/FAILURE"
)<void, UserInfoResponseType, ErrorType>();

export const userGroupAction = createSafeAsyncAction(
  "@userGroup/REQUEST",
  "@userGroup/SUCESS",
  "@userGroup/FAILURE"
)<void, { groups: UserGroupType[]; myGroups: UserGroupType[] }, ErrorType>();

export type LoginActionType = ActionType<
  | typeof allGroupsAction
  | typeof codeListsAction
  | typeof codeListsShreaddingPlanAction
  | typeof loginAction
  | typeof loginAction__ClearError
  | typeof loginKeepAction
  | typeof loginUpdateExpireInAction
  | typeof loginSetSessionTokenAction
  | typeof pathsInfoAction
  | typeof setActiveGroupAction
  | typeof userInfoAction
  | typeof userGroupAction
>;
