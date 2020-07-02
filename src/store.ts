import { RootActionsType } from "actions";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { logoutAction } from "core/features/logout/_actions";
import { createBrowserHistory } from "history";
import { default as localForage } from "localforage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import { PersistPartial } from "redux-persist/lib/persistReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import createSagaMiddleware from "redux-saga";
import { Config, createStateSyncMiddleware } from "redux-state-sync";
import { getType } from "typesafe-actions";
import { reducers, RootStateType, RouterReducerType } from "./reducers";
import { combineSagas, rootSaga } from "./sagas";

const persistConfig = {
  blacklist: ["nodePreviewReducer", "metaFormReducer"],
  key: "app",
  stateReconciler: autoMergeLevel2,
  storage: localForage
};

export const createAppStore = () => {
  const history = createBrowserHistory();
  const sagaMiddleware = createSagaMiddleware();
  const routingMiddleware = routerMiddleware(history);
  const middlewares = [sagaMiddleware, routingMiddleware];

  if (process.env.NODE_ENV !== "test") {
    const whitelist = ["@automaticLogoutDialog/", "@login/", "@logout/"];

    const config: Config = {
      blacklist: ["persist/PERSIST"],
      predicate: (action) =>
        !!whitelist.find((item) => action.type.startsWith(item))
    };

    middlewares.unshift(createStateSyncMiddleware(config));
  }

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line global-require
    const { createLogger } = require("redux-logger");

    const logger = createLogger({
      collapsed: true
    });

    middlewares.push(logger);
  }

  const composeEnhancers = composeWithDevTools({
    name: "SpisUm"
  });

  const combineReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  const persistedReducer = persistReducer<RootStateType & RouterReducerType>(
    persistConfig,
    combineReducer
  );

  const appReducer = (
    state:
      | (RootStateType & RouterReducerType)
      | (RootStateType & RouterReducerType & PersistPartial)
      | undefined,
    action: RootActionsType
  ) => {
    // global reset state!! (instead important values)
    if (action.type === getType(logoutAction.success)) {
      state =
        state &&
        ({
          _persist: (state as RootStateType &
            RouterReducerType &
            PersistPartial)._persist,
          loginReducer: {
            session: {
              remember: state?.loginReducer?.session?.remember
            }
          },
          router: state.router
        } as RootStateType & RouterReducerType & PersistPartial);
    }

    return persistedReducer(
      state as RootStateType & RouterReducerType & PersistPartial,
      action
    );
  };

  const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(combineSagas([...rootSaga]));

  const persistor = persistStore(store);

  return {
    history,
    persistor,
    store
  };
};
