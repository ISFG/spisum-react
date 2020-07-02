/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import { MenuItemType } from "core/components/menu/_types";
import { mount } from "enzyme";
import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { redirectFromMenu } from "../routerRedirect";

const menuItems: MenuItemType[] = [
  {
    submenu: [
      {
        redirectTo: "/dashboard1-submenu1-submenu1" as any,
        submenu: [
          {
            url: "/dashboard1-submenu1-submenu1" as any
          },
          {
            url: "/dashboard1-submenu1-submenu2" as any
          },
          {
            redirectTo: "/dashboard4" as any,
            url: "/dashboard1-submenu1-submenu3" as any
          }
        ],
        url: "/dashboard1-submenu1" as any
      },
      {
        url: "/dashboard1-submenu2" as any
      },
      {
        url: "/dashboard1-submenu2" as any
      }
    ],
    url: "/dashboard1" as any
  },
  {
    url: "/dashboard2" as any
  },
  {
    url: "/dashboard3" as any
  },
  {
    url: "/dashboard4" as any
  }
];

describe("Redirect test", () => {
  test("routerRedirectFromMenu", () => {
    expect(redirectFromMenu("/dashboard1", menuItems)).toBeNull();
    expect(
      mount(
        <BrowserRouter>
          {redirectFromMenu("/dashboard1-submenu1", menuItems)}
        </BrowserRouter>
      ).containsMatchingElement(<Redirect to="/dashboard1-submenu1-submenu1" />)
    ).toBeTruthy();
    expect(
      mount(
        <BrowserRouter>
          {redirectFromMenu("/dashboard1-submenu1/", menuItems)}
        </BrowserRouter>
      ).containsMatchingElement(<Redirect to="/dashboard1-submenu1-submenu1" />)
    ).toBeTruthy();
    expect(
      mount(
        <BrowserRouter>
          {redirectFromMenu("/dashboard1-submenu1-submenu3", menuItems)}
        </BrowserRouter>
      ).containsMatchingElement(<Redirect to="/dashboard4" />)
    ).toBeTruthy();
    expect(
      mount(
        <BrowserRouter>
          {redirectFromMenu("/dashboard1-SUBMENU1-submenu3/", menuItems)}
        </BrowserRouter>
      ).containsMatchingElement(<Redirect to="/dashboard4" />)
    ).toBeTruthy();
  });
});
