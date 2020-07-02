/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import { initialState } from "core/features/login/_reducer";
import { SessionStatus } from "core/features/login/_types";
import { CoreRoutes } from "core/routes";
import { mount } from "enzyme";
import React from "react";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { RootStateType } from "reducers";
import { TestReduxProvider } from "testUtils";
import ProtectedRoute from "./";

type Store = Pick<RootStateType, "loginReducer">;

describe("ProtectedRoute test", () => {
  const DefaultComponent = () => <div>default</div>;
  const ProtectedComponent = () => <div>protected</div>;
  const TestComponent = () => <div>test</div>;

  test("Protected route check default redirect", () => {
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
        <MemoryRouter initialEntries={[CoreRoutes.DASHBOARD]}>
          <Switch>
            <ProtectedRoute
              children={<ProtectedComponent />}
              exact={true}
              path={CoreRoutes.DASHBOARD}
            />
            <Route exact={true} children={<TestComponent />} path="/" />
            <Route
              exact={true}
              children={<DefaultComponent />}
              path={ProtectedRoute.defaultProps.redirectTo}
            />
            <Route children={<TestComponent />} />
          </Switch>
        </MemoryRouter>
      </TestReduxProvider>
    );

    expect(
      component.containsMatchingElement(<DefaultComponent />)
    ).toBeTruthy();
  });

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
        <MemoryRouter initialEntries={[CoreRoutes.DASHBOARD]}>
          <Switch>
            <ProtectedRoute
              children={<ProtectedComponent />}
              exact={true}
              path={CoreRoutes.DASHBOARD}
            />
            <Route children={<DefaultComponent />} />
          </Switch>
        </MemoryRouter>
      </TestReduxProvider>
    );

  test("Protected route is not included", () => {
    const component = mountComponent(SessionStatus.UNAUTHORIZED);

    expect(
      component.containsMatchingElement(<ProtectedComponent />)
    ).toBeFalsy();
  });

  test("Protected route is included", () => {
    const component = mountComponent(SessionStatus.AUTHORIZED);

    expect(
      component.containsMatchingElement(<ProtectedComponent />)
    ).toBeTruthy();
  });
});
