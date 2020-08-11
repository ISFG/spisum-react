/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import { TextField } from "@material-ui/core";
import Login from "core/features/login/Component";
import { mount, render } from "enzyme";
import React from "react";
import { RootStateType } from "reducers";
import { classPath, translationPath } from "share/utils/getPath";
import { TestReduxProvider } from "testUtils";
import { t } from "translation/i18n";
import lang from "translation/lang";
import {
  ErrorMessage,
  LoginButton,
  LoginCheckingSpinner
} from "./Component.form.styles";
import { initialState } from "./_reducer";
import { LoginFormValuesTypeProxy, SessionStatus } from "./_types";

type Store = Pick<RootStateType, "loginReducer">;

describe("Login page tests", () => {
  const loginComponentDOM = render(
    <TestReduxProvider>
      <Login />
    </TestReduxProvider>
  );
  const loginComponent = mount(
    <TestReduxProvider>
      <Login />
    </TestReduxProvider>
  );

  test("Login button contains text", () => {
    expect(loginComponentDOM.find(".login-button-label").text()).toMatch(
      t(translationPath(lang.login.signUp))
    );
    expect(
      loginComponent
        .find(LoginButton)
        .contains(t(translationPath(lang.login.signUp)))
    ).toBeTruthy();
  });

  test("Login page contains username input", () => {
    expect(
      loginComponent.containsMatchingElement(
        <TextField name={classPath(LoginFormValuesTypeProxy.username).path} />
      )
    ).toBeTruthy();
  });

  test("Login page contains password input", () => {
    expect(
      loginComponent.containsMatchingElement(
        <TextField name={classPath(LoginFormValuesTypeProxy.password).path} />
      )
    ).toBeTruthy();
  });

  test("Login page contains login button", () => {
    expect(loginComponent.find(LoginButton).length).toBe(1);
  });

  test("Login button do not contains loading", () => {
    expect(
      loginComponent
        .find(LoginButton)
        .containsMatchingElement(<LoginCheckingSpinner />)
    ).toBeFalsy();
  });

  const loginComponentWithLoading = mount(
    <TestReduxProvider<Store>
      store={{
        loginReducer: {
          ...initialState,
          error: null,
          pending: true,
          session: {
            groups: [],
            myGroups: [],
            remember: null,
            signer: false,
            status: SessionStatus.UNAUTHORIZED
          }
        }
      }}
    >
      <Login />
    </TestReduxProvider>
  );

  test("Login button contains loading", () => {
    expect(
      loginComponentWithLoading
        .find(LoginButton)
        .containsMatchingElement(<LoginCheckingSpinner />)
    ).toBeTruthy();
  });

  const loginComponentWithError = mount(
    <TestReduxProvider<Store>
      store={{
        loginReducer: {
          ...initialState,
          error: {
            code: "403",
            message: null
          },
          pending: true,
          session: {
            groups: [],
            myGroups: [],
            remember: null,
            signer: false,
            status: SessionStatus.UNAUTHORIZED
          }
        }
      }}
    >
      <Login />
    </TestReduxProvider>
  );

  test("Login page contains error", () => {
    expect(loginComponentWithError.find(ErrorMessage).length).toBe(1);
  });

  test("Login error contains text", () => {
    expect(
      loginComponentWithError
        .find(ErrorMessage)
        .contains(t(translationPath(lang._common.codes.AUTH)))
    ).toBeTruthy();
  });

  const loginComponentWithErrorAuth = mount(
    <TestReduxProvider<Store>
      store={{
        loginReducer: {
          ...initialState,
          error: {
            code: "AUTH",
            message: null
          },
          pending: true,
          session: {
            groups: [],
            myGroups: [],
            remember: null,
            signer: false,
            status: SessionStatus.UNAUTHORIZED
          }
        }
      }}
    >
      <Login />
    </TestReduxProvider>
  );

  test("Login error contains text", () => {
    expect(
      loginComponentWithErrorAuth
        .find(ErrorMessage)
        .contains(t(translationPath(lang._common.codes.AUTH)))
    ).toBeTruthy();
  });
});
