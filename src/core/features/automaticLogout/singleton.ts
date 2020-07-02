import { SessionStatus } from "core/features/login/_types";
import { CoreRoutes } from "core/routes";
import { automaticLogoutWarningTime } from "global";
import { History } from "history";
import { RootStateType, RouterReducerType } from "reducers";
import { AnyAction, Store } from "redux";
import { logoutAction } from "../logout/_actions";
import {
  automaticLogoutDialogCloseAction,
  automaticLogoutDialogOpenAction
} from "./_actions";

export class AutomaticLogoutSingleton {
  private static instance: AutomaticLogoutSingleton | null;
  private store: Store<RootStateType & RouterReducerType, AnyAction>;
  private history: History;

  public constructor(
    store: Store<RootStateType & RouterReducerType, AnyAction>,
    history: History
  ) {
    this.store = store;
    this.history = history;
    if (AutomaticLogoutSingleton.instance) {
      return AutomaticLogoutSingleton.instance;
    }
    AutomaticLogoutSingleton.instance = this;
    this.automaticCompution();
  }

  private automaticCompution() {
    const state = this.store.getState();

    if (
      state &&
      state.loginReducer &&
      state.loginReducer.session &&
      state.loginReducer.session.status !== SessionStatus.AUTHORIZED
    ) {
      AutomaticLogoutSingleton.instance = null;
      return;
    }

    if (
      state &&
      state.loginReducer &&
      state.loginReducer.expireIn &&
      !state.loginReducer.keepPending &&
      !state.loginReducer.logoutPending &&
      new Date().getTime() > state.loginReducer.expireIn
    ) {
      this.store.dispatch(automaticLogoutDialogCloseAction());
      this.store.dispatch(logoutAction.success());
      this.history.push(CoreRoutes.LOGIN);
      AutomaticLogoutSingleton.instance = null;
      return;
    }

    if (
      state &&
      state.loginReducer &&
      state.loginReducer.expireIn &&
      !state.loginReducer.keepPending &&
      !state.loginReducer.logoutPending &&
      !state.automaticLogoutDialogReducer.logoutInterval &&
      state.loginReducer.expireIn - new Date().getTime() <
        automaticLogoutWarningTime * 1000
    ) {
      this.store.dispatch(
        automaticLogoutDialogOpenAction(
          Math.ceil((state.loginReducer.expireIn - new Date().getTime()) / 1000)
        )
      );
    }

    setTimeout(() => {
      this.automaticCompution();
    }, 1000);
  }
}
