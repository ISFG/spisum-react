import { MenuItemType, SubmenuItemType } from "core/components/menu/_types";
import { menuItems } from "core/hooks/useMenuItemsWithPermissons";
import { findRedirect } from "share/utils/routerRedirect";

describe("Test loop in menu redirect", () => {
  const allRoutes: string[] = [];

  const addUrlToArray = (url: string) => {
    if (!allRoutes.includes(url)) {
      allRoutes.push(url);
    }
  };

  const findAllRoutes = (menuItems: (MenuItemType | SubmenuItemType)[]) => {
    for (const item of menuItems) {
      if (item.url) {
        addUrlToArray(item.url);
      }
      if (item.redirectTo) {
        addUrlToArray(item.redirectTo);
      }
      if (item.submenu && item.submenu.length) {
        findAllRoutes(item.submenu);
      }
    }
  };

  findAllRoutes(Object.values(menuItems));

  const isInMenuLoop = (url: any) => {
    let tryNumber = 0;
    const maxTry = 100;
    do {
      url = findRedirect(url, Object.values(menuItems));
      if (!url) break;
    } while (++tryNumber < maxTry);

    if (tryNumber === maxTry) {
      throw Error(`url '${url}' - Limit of redirect was reached`);
    }
  };

  const startTest = () => {
    for (const url of allRoutes) {
      isInMenuLoop(url);
    }
  };

  test("Redirect loop", () => {
    expect(startTest()).toBeUndefined();
  });
});
