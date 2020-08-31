/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import { Drawer, ListItemIcon } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { initialState } from "core/features/login/_reducer";
import { SessionStatus } from "core/features/login/_types";
import { mount, render } from "enzyme";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RootStateType } from "reducers";
import Router from "router";
import { TestReduxProvider } from "testUtils";
import Menu from "./";
import { Main } from "./Component.styles";
import { MenuItemType } from "./_types";

type Store = Pick<RootStateType, "loginReducer">;

enum URL {
  menu1 = "/menu-1",
  menu1Submenu1 = "/menu-1/submenu-1",
  menu1Submenu1Submenu1 = "/menu-1/submenu-1/submenu-1",
  menu3 = "/menu-3"
}

const testContent = "test content";

const Menu1Submenu1Submenu1 = () => {
  return <div>Menu1Submenu1Submenu1</div>;
};

const menuItems: MenuItemType[] = [
  {
    __testId: URL.menu1,
    submenu: [
      {
        __testId: URL.menu1Submenu1,
        text: "Menu 1 - Submenu 1"
      },
      {
        submenu: [
          {
            content: <Menu1Submenu1Submenu1 />,
            text: "Menu 1 - Submenu 1 - Submenu 1",
            url: URL.menu1Submenu1Submenu1 as any
          },
          {
            text: "Menu 1 - Submenu 1 - Submenu 2"
          },
          {
            text: "Menu 1 - Submenu 1 - Submenu 3"
          }
        ],
        text: "Menu 1 - Submenu 2"
      },
      {
        text: "Menu 1 - Submenu 2"
      }
    ],
    redirectTo: URL.menu1Submenu1Submenu1 as any,
    text: "Menu 1",
    url: URL.menu1 as any
  },
  {
    icon: <DeleteIcon />,
    text: "Menu 2"
  },
  {
    redirectTo: URL.menu3 as any,
    submenu: [
      {
        text: "Menu 3 - Submenu 1"
      },
      {
        submenu: [
          {
            text: "Menu 3 - Submenu 1 - Submenu 1"
          },
          {
            text: "Menu 3 - Submenu 1 - Submenu 2"
          },
          {
            text: "Menu 3 - Submenu 1 - Submenu 3"
          }
        ],
        text: "Menu 3 - Submenu 2"
      },
      {
        text: "Menu 3 - Submenu 2"
      }
    ],
    text: "Menu 3"
  },
  {
    isDivider: true
  },
  {
    text: "Menu 4"
  }
];

describe("Menu test", () => {
  const menuComponent = mount(
    <TestReduxProvider>
      <Menu itemsOfMenu={menuItems}>{testContent}</Menu>
    </TestReduxProvider>
  );

  const menuComponentDOM = render(
    <TestReduxProvider>
      <Menu itemsOfMenu={menuItems}>{testContent}</Menu>
    </TestReduxProvider>
  );

  const menuComponentWithRouter = (url: string) =>
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
              status: SessionStatus.AUTHORIZED
            }
          }
        }}
      >
        <MemoryRouter initialEntries={[url]}>
          <Router itemsOfMenu={menuItems} />
        </MemoryRouter>
      </TestReduxProvider>
    );

  test("Menu contains text", () => {
    expect(menuComponent.find(Main).contains(testContent)).toBeTruthy();
    expect(
      menuComponent.find(Drawer).find(ListItemIcon).find(DeleteIcon)
    ).toHaveLength(1);
    expect(menuComponentDOM.find(`[data-test-id="${URL.menu1}"]`)).toHaveLength(
      1
    );
    expect(
      menuComponentDOM.find(`[data-test-id="${URL.menu1Submenu1}"]`)
    ).toHaveLength(0);
  });

  test("Menu content by URL", () => {
    expect(
      menuComponentWithRouter(URL.menu1Submenu1Submenu1).find(
        Menu1Submenu1Submenu1
      )
    ).toHaveLength(1);
  });

  test("Menu content redirect to", () => {
    expect(
      menuComponentWithRouter(URL.menu1).find(Menu1Submenu1Submenu1)
    ).toHaveLength(1);
  });
});
