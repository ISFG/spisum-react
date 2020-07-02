import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import { ThemeProvider } from "emotion-theming";
import { merge } from "lodash";
import React, { useMemo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { createAppStore } from "store";
import { muiTheme, theme } from "styles";

const mockStore = configureStore([]);

interface OwnProps<T> {
  children: React.ReactNode;
  store?: T;
}

export const TestReduxProvider = <T,>({ children, store }: OwnProps<T>) => {
  const appStore = useMemo(createAppStore, []);
  const _store = useMemo(() => {
    return (
      (store && mockStore(merge(appStore.store.getState(), store))) ||
      appStore.store
    );
  }, [appStore, store]);

  return (
    <Provider store={_store}>
      <StylesProvider injectFirst={true}>
        <MuiThemeProvider theme={muiTheme}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>{children}</BrowserRouter>
          </ThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </Provider>
  );
};
