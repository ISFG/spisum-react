import "@abraham/reflection";
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider
} from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import { ErrorBoundary } from "core/components/errorBoundary";
import { GlobalStyles } from "core/styles/global";
import { ThemeProvider } from "emotion-theming";
import "normalize.css";
import React from "react";
import "react-app-polyfill/ie11";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Router from "router";
import "share/utils/extensions";
import { createAppStore } from "store";
import { muiTheme, theme } from "styles";
import "translation/i18n";
import { boot } from "./boot";
import { GlobalError } from "./core/components/errorBoundary/errorTypes/GlobalError";

if (process.env.NODE_ENV === "development") {
  // tslint:disable-next-line no-var-requires
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false
  });
}

const rootEl = document.getElementById("root") as HTMLElement;
const render = (Component: React.ComponentType) => {
  boot();

  const appStore = createAppStore();

  return ReactDOM.render(
    <Provider store={appStore.store}>
      <PersistGate loading={null} persistor={appStore.persistor}>
        <StylesProvider injectFirst={true}>
          <MuiThemeProvider theme={muiTheme}>
            <ThemeProvider theme={theme}>
              <ConnectedRouter history={appStore.history}>
                <GlobalStyles />
                <ErrorBoundary Component={GlobalError}>
                  <Component />
                </ErrorBoundary>
              </ConnectedRouter>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </PersistGate>
    </Provider>,
    rootEl
  );
};

render(Router);

// tslint:disable-next-line
if ((module as any).hot) {
  // tslint:disable-next-line
  (module as any).hot.accept("./router", () => {
    const NextApp = require("./router").default;
    render(NextApp);
  });
}
