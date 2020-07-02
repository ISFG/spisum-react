import { MenuItemType, SubmenuItemType } from "./_types";

export const getActiveItemId = (
  location: string,
  itemsOfMenu: (MenuItemType | SubmenuItemType)[],
  isInHidden: boolean = false
) => {
  for (const item of itemsOfMenu) {
    if (
      item.url?.toLowerCase().trimEnd("/") === location ||
      (item.submenu &&
        item.submenu.length &&
        getActiveItemId(location, item.submenu, isInHidden || item.isHidden) !==
          -1)
    ) {
      return isInHidden ? -1 : itemsOfMenu.indexOf(item);
    }
  }
  return -1;
};
