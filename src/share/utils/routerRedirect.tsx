import { MenuItemType, SubmenuItemType } from "core/components/menu/_types";
import React from "react";
import { Redirect } from "react-router-dom";
import { RootRouterType } from "router";

export const findRedirect = (
  location: string,
  itemsOfMenu: (MenuItemType | SubmenuItemType)[],
  isInHidden: boolean = false
): RootRouterType | null => {
  for (const item of itemsOfMenu) {
    if (
      item.url &&
      item.url.toLowerCase().trimEnd("/") === location &&
      item.redirectTo
    ) {
      return item.isHidden ? null : item.redirectTo;
    }
    const redirectInSubmenu =
      item.submenu &&
      item.submenu.length &&
      findRedirect(location, item.submenu, isInHidden || item.isHidden);
    if (redirectInSubmenu) {
      return item.isHidden ? null : redirectInSubmenu;
    }
  }
  return null;
};

export const redirectFromMenu = (
  location: string,
  itemsOfMenu: (MenuItemType | SubmenuItemType)[]
) => {
  const redirectTo = findRedirect(
    location.toLowerCase().trimEnd("/"),
    itemsOfMenu
  );
  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }
  return null;
};
