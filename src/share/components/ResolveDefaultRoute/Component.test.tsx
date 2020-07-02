/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import { initialState } from "core/features/login/_reducer";
import { SessionStatus } from "core/features/login/_types";
import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Redirect, Route, Switch } from "react-router-dom";
import { RootStateType } from "reducers";
import { TestReduxProvider } from "testUtils";
import ResolveDefaultRoute from "./";

type Store = Pick<RootStateType, "loginReducer">;

describe("ResolveDefaultRoute test", () => {
  const DefaultComponent = () => <div>default</div>;
  const TestComponent = () => <div>test</div>;

  const redirectToForUnauthorized = "/test-unauthorized-route" as any;
  const redirectToForAauthorized = "/test-authorized-route" as any;

  const mountComponent = (status: SessionStatus) =>
    mount(
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
              status
            }
          }
        }}
      >
        <MemoryRouter initialEntries={["/someAddress"]}>
          <Switch>
            <ResolveDefaultRoute
              redirectToForAauthorized={redirectToForAauthorized}
              redirectToForUnauthorized={redirectToForUnauthorized}
            />
            <Route
              exact={true}
              children={<DefaultComponent />}
              path={redirectToForUnauthorized}
            />
          </Switch>
        </MemoryRouter>
      </TestReduxProvider>
    );

  test("Default redirect", () => {
    const component = mountComponent(SessionStatus.UNAUTHORIZED);

    expect(
      component.containsMatchingElement(
        <Redirect to={redirectToForUnauthorized} />
      )
    ).toBeTruthy();
  });

  test("Authorized redirect", () => {
    const component = mountComponent(SessionStatus.AUTHORIZED);

    expect(
      component.containsMatchingElement(
        <Redirect to={redirectToForAauthorized} />
      )
    ).toBeTruthy();
  });

  test("Unauthorized redirect to children", () => {
    const component = mount(
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
              status: SessionStatus.UNAUTHORIZED
            }
          }
        }}
      >
        <MemoryRouter initialEntries={["/someAddress"]}>
          <Switch>
            <ResolveDefaultRoute defaultChildren={<DefaultComponent />} />
            <Route children={<TestComponent />} />
          </Switch>
        </MemoryRouter>
      </TestReduxProvider>
    );

    expect(
      component.containsMatchingElement(<DefaultComponent />)
    ).toBeTruthy();
  });
});
