/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import { MenuItemType, SubmenuItemType } from "core/components/menu/_types";
import Dashboard from "core/features/dashboard";
import Login from "core/features/login";
import { initialState } from "core/features/login/_reducer";
import { SessionStatus } from "core/features/login/_types";
import { rootMenuItems } from "core/hooks/useMenuItemsWithPermissons";
import { CoreRoutes } from "core/routes";
import { mount } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RootStateType } from "reducers";
import Router from "router";
import { TestReduxProvider } from "testUtils";

type Store = Pick<RootStateType, "loginReducer">;

describe("Router test", () => {
  const mountComponent = (path: string, status: SessionStatus) =>
    mount(
      <TestReduxProvider<Store>
        store={{
          loginReducer: {
            ...initialState,
            error: null,
            pending: true,
            session: {
              domain: "",
              groups: [],
              myGroups: [],
              remember: null,
              signer: false,
              status
            }
          }
        }}
      >
        <MemoryRouter initialEntries={[path]}>
          <Router />
        </MemoryRouter>
      </TestReduxProvider>
    );

  test("Redirect to login", () => {
    let component = mountComponent(
      CoreRoutes.LOGIN,
      SessionStatus.UNAUTHORIZED
    );
    expect(component.containsMatchingElement(<Login />)).toBeTruthy();

    component = mountComponent("/someAddress", SessionStatus.UNAUTHORIZED);
    expect(component.containsMatchingElement(<Login />)).toBeTruthy();
  });

  test("Redirect to dashboard", () => {
    let component = mountComponent(
      CoreRoutes.DASHBOARD,
      SessionStatus.AUTHORIZED
    );
    expect(component.containsMatchingElement(<Dashboard />)).toBeTruthy();

    component = mountComponent(CoreRoutes.LOGIN, SessionStatus.AUTHORIZED);
    expect(component.containsMatchingElement(<Dashboard />)).toBeTruthy();

    component = mountComponent("/someAddress", SessionStatus.AUTHORIZED);
    expect(component.containsMatchingElement(<Dashboard />)).toBeTruthy();
  });

  test("Menu duplicity", () => {
    const usedUrls: string[] = [];
    const redundantUrls: string[] = [];
    const addUrl = (url: string, array: string[]) => {
      if (url && !array.includes(url)) {
        array.push(url);
      }
    };
    const testDuplicity = (items: (MenuItemType | SubmenuItemType)[]) => {
      for (const item of items) {
        if (item.url && usedUrls.includes(item.url)) {
          addUrl(item.url, redundantUrls);
        }
        if (item.submenu && item.submenu.length) {
          testDuplicity(item.submenu);
        }
        addUrl(item.url as string, usedUrls);
      }
    };

    testDuplicity(Object.values(rootMenuItems));
    expect(redundantUrls).toMatchObject([]);
  });
});
