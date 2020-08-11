import { MenuItemType } from "core/components/menu/_types";
import { AllGroupType } from "core/features/login/_types";
import { menuItems as administrationMenuItems } from "modules/administration/menuItems";
import { menuItems as dispatchMenuItems } from "modules/dispatch/menuItems";
import { menuItems as evidenceMenuItems } from "modules/evidence/menuItems";
import { menuItems as mailroomMenuItems } from "modules/mailroom/menuItems";
import { menuItems as recordRetentionProcessMenuItems } from "modules/recordRetentionProcess/menuItems";
import { menuItems as repositoryMenuItems } from "modules/repository/menuItems";
import { menuItems as signatureBookMenuItems } from "modules/signatureBook/menuItems";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { userHasSignPermissions } from "share/utils/user";
import { SpisumGroups } from "../../enums";

export enum MenuItems {
  MailRoom = "mailroomMenuItems",
  Evidence = "evidenceMenuItems",
  Dispatch = "dispatchMenuItems",
  Repository = "repositoryMenuItems",
  SignatureBook = "signatureBookMenuItems",
  RetentionProcess = "recordRetentionProcessMenuItems",
  Administration = "administrationMenuItems"
}

export const rootMenuItems = {
  [MenuItems.MailRoom]: mailroomMenuItems[0],
  [MenuItems.Evidence]: evidenceMenuItems[0],
  [MenuItems.Dispatch]: dispatchMenuItems[0],
  [MenuItems.Repository]: repositoryMenuItems[0],
  [MenuItems.SignatureBook]: signatureBookMenuItems[0],
  [MenuItems.RetentionProcess]: recordRetentionProcessMenuItems[0],
  [MenuItems.Administration]: administrationMenuItems[0]
};

const rootMenuItemsValues = Object.values(rootMenuItems);

export const setHiddenMenuItems = (itemsToHide: string[]): MenuItemType[] => {
  if (!itemsToHide?.length) {
    return rootMenuItemsValues;
  }

  return Object.keys(rootMenuItems).reduce(
    (items: MenuItemType[], menuItem: string) => {
      if (itemsToHide.includes(menuItem)) {
        return items;
      }

      return [...items, rootMenuItems[menuItem]];
    },
    []
  );
};

const changeMenuItemsVisibilityByGroup = (
  isAdmin: boolean,
  activeGroup: string | undefined = "",
  allGroups: AllGroupType,
  canSign: boolean
): MenuItemType[] => {
  const dispatchGroups = allGroups.dispatch.map((grp) => grp.id);
  const repositoryGroups = allGroups.repository.map((grp) => grp.id);

  if (isAdmin) {
    return setHiddenMenuItems([
      MenuItems.MailRoom,
      MenuItems.Evidence,
      MenuItems.Dispatch,
      MenuItems.Repository,
      MenuItems.SignatureBook,
      MenuItems.RetentionProcess
    ]);
  }

  if (activeGroup === SpisumGroups.Mailroom) {
    return setHiddenMenuItems([
      MenuItems.Dispatch,
      MenuItems.Repository,
      MenuItems.RetentionProcess,
      MenuItems.Administration,
      !canSign ? MenuItems.SignatureBook : ""
    ]);
  }

  if (dispatchGroups.includes(activeGroup)) {
    return setHiddenMenuItems([
      MenuItems.MailRoom,
      MenuItems.Repository,
      MenuItems.RetentionProcess,
      MenuItems.Administration,
      !canSign ? MenuItems.SignatureBook : ""
    ]);
  }

  if (repositoryGroups.includes(activeGroup)) {
    return setHiddenMenuItems([
      MenuItems.MailRoom,
      MenuItems.Evidence,
      MenuItems.Dispatch,
      MenuItems.SignatureBook,
      MenuItems.Administration
    ]);
  }

  return setHiddenMenuItems([
    MenuItems.MailRoom,
    MenuItems.Dispatch,
    MenuItems.Repository,
    MenuItems.RetentionProcess,
    MenuItems.Administration,
    !canSign ? MenuItems.SignatureBook : ""
  ]);
};

export const useMenuItemsWithPermissions = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>(
    Object.values(rootMenuItems)
  );
  const session = useSelector(
    (state: RootStateType) => state.loginReducer.session
  );

  const groups = useSelector(
    (state: RootStateType) => state.loginReducer.global.groups
  );

  const { activeGroup, isAdmin } = session;

  useEffect(() => {
    const canSign = userHasSignPermissions(session);
    const newMenuItems = changeMenuItemsVisibilityByGroup(
      !!isAdmin,
      activeGroup,
      groups,
      canSign
    );
    setMenuItems(newMenuItems);
  }, [activeGroup, groups, isAdmin]); // eslint-disable-line react-hooks/exhaustive-deps

  return menuItems;
};
