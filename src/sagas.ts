import { watchDataboxAccountsAction } from "core/api/databox/_sagas";
import { watchEmailAccountsAction } from "core/api/email/_sagas";
import {
  watchAllGroupsAction,
  watchCodeListsAction,
  watchLoginAction,
  watchLoginKeepAction,
  watchPathsInfoAction,
  watchUserGroupAction,
  watchUserInfoAction
} from "core/features/login/_sagas";
import { watchLogoutAction } from "core/features/logout/_sagas";
import coreSagas from "core/sagas";
import { evidenceSagas } from "modules/evidence/sagas";
import { all, fork } from "redux-saga/effects";
import dialogSagas from "share/components/dialog/sagas";
import { watchRetentionActions } from "./core/api/retention/_sagas";
import mailRoomSagas from "./modules/mailroom/sagas";

export const rootSaga = [
  // ...mailRoomSagas,
  ...coreSagas,
  ...dialogSagas,
  ...mailRoomSagas,
  ...evidenceSagas,
  watchAllGroupsAction,
  watchCodeListsAction,
  watchLoginAction,
  watchLoginKeepAction,
  watchLogoutAction,
  watchPathsInfoAction,
  watchUserGroupAction,
  watchUserInfoAction,
  watchDataboxAccountsAction,
  watchEmailAccountsAction,
  watchRetentionActions
];

export type SagasType = typeof rootSaga;

export const combineSagas = (sagas: SagasType) =>
  function* appSaga() {
    yield all(sagas.map((saga) => fork(saga)));
  };
