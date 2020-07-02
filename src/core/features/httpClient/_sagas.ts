import {
  loginAction,
  loginSetSessionTokenAction,
  setActiveGroupAction,
  userInfoAction
} from "../login/_actions";
import { takeEvery } from "redux-saga/effects";
import { ActionType, getType } from "typesafe-actions";
import { RootStateType } from "../../../reducers";
import { createSafeAction } from "../../../share/utils/typesafeActions";
import { httpClient } from "../../services";
import { logoutAction } from "../logout/_actions";

const rehydrateAction = createSafeAction("persist/REHYDRATE")<RootStateType>();

export function* watchHttpSagas() {
  const httpService = httpClient();

  yield takeEvery(
    getType(loginSetSessionTokenAction),
    ({ payload }: ActionType<typeof loginSetSessionTokenAction>) => {
      httpService.setAuthToken(payload.token);
    }
  );

  yield takeEvery(
    getType(loginAction.request),
    () => {
      httpService.setAuthToken(undefined);
      httpService.setActiveGroup(undefined);
    }
  );

  yield takeEvery(
    getType(logoutAction.success),
    () => {
      httpService.setAuthToken(undefined);
    }
  );

  yield takeEvery(
    getType(setActiveGroupAction),
    ({ payload }: ActionType<typeof setActiveGroupAction>) => {
      httpService.setActiveGroup(payload);
    }
  );

  yield takeEvery(
    getType(userInfoAction.success),
    ({ payload }: ActionType<typeof userInfoAction.success>) => {
      httpService.setActiveGroup(payload.entry?.properties?.ssl?.group);
    }
  );

  yield takeEvery(
    getType(rehydrateAction),
    ({ payload }: ActionType<typeof rehydrateAction>) => {
      if (!payload) {
        return;
      }

      httpService.setAuthToken(payload.loginReducer?.session?.token);
      httpService.setActiveGroup(payload.loginReducer?.session?.activeGroup);
    }
  );
}
