import { MenuItemType, SubmenuItemType } from "./_types";

export const getActiveItemId = (
  location: string,
  itemsOfMenu: (MenuItemType | SubmenuItemType)[]
) => {
  for (const item of itemsOfMenu) {
    if (
      item.url?.toLowerCase().trimEnd("/") === location ||
      (item.submenu &&
        item.submenu.length &&
        getActiveItemId(location, item.submenu) !== -1)
    ) {
      return itemsOfMenu.indexOf(item);
    }
  }
  return -1;
};
