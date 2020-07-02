import { menuItems as administrationMenuItems } from "modules/administration/menuItems";
import { menuItems as dispatchMenuItems } from "modules/dispatch/menuItems";
import { menuItems as evidenceMenuItems } from "modules/evidence/menuItems";
import { menuItems as mailroomMenuItems } from "modules/mailroom/menuItems";
import { menuItems as recordRetentionProcessMenuItems } from "modules/recordRetentionProcess/menuItems";
import { menuItems as repositoryMenuItems } from "modules/repository/menuItems";
import { menuItems as signatureBookMenuItems } from "modules/signatureBook/menuItems";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { SpisumGroups } from "../../enums";
import { RootStateType } from "../../reducers";
import { AllGroupType } from "../features/login/_types";

export enum MenuItems {
  MailRoom = "mailroomMenuItems",
  Evidence = "evidenceMenuItems",
  Dispatch = "dispatchMenuItems",
  Repository = "repositoryMenuItems",
  SignatureBook = "signatureBookMenuItems",
  RetentionProcess = "recordRetentionProcessMenuItems",
  Administration = "administrationMenuItems"
}

export const menuItems = {
  [MenuItems.MailRoom]: mailroomMenuItems[0],
  [MenuItems.Evidence]: evidenceMenuItems[0],
  [MenuItems.Dispatch]: dispatchMenuItems[0],
  [MenuItems.Repository]: repositoryMenuItems[0],
  [MenuItems.SignatureBook]: signatureBookMenuItems[0],
  [MenuItems.RetentionProcess]: recordRetentionProcessMenuItems[0],
  [MenuItems.Administration]: administrationMenuItems[0]
};

export const setHiddenMenuItems = (itemsToHide: string[]): void => {
  if (!itemsToHide?.length) return;
  Object.keys(menuItems).forEach((menuItem) => {
    menuItems[menuItem].isHidden = !!itemsToHide.includes(menuItem);
  });
};

const changeMenuItemsVisibilityByGroup = (
  isAdmin: boolean,
  activeGroup: string | undefined = "",
  allGroups: AllGroupType
): void => {
  const dispatchGroups = allGroups.dispatch.map((grp) => grp.id);
  const repositoryGroups = allGroups.repository.map((grp) => grp.id);

  if (isAdmin) {
    setHiddenMenuItems([
      MenuItems.MailRoom,
      MenuItems.Evidence,
      MenuItems.Dispatch,
      MenuItems.Repository,
      MenuItems.SignatureBook,
      MenuItems.RetentionProcess
    ]);
  } else if (activeGroup === SpisumGroups.Mailroom) {
    setHiddenMenuItems([
      MenuItems.Dispatch,
      MenuItems.Repository,
      MenuItems.RetentionProcess,
      MenuItems.Administration
    ]);
  } else if (dispatchGroups.includes(activeGroup)) {
    setHiddenMenuItems([
      MenuItems.MailRoom,
      MenuItems.Repository,
      MenuItems.RetentionProcess,
      MenuItems.Administration
    ]);
  } else if (repositoryGroups.includes(activeGroup)) {
    setHiddenMenuItems([
      MenuItems.MailRoom,
      MenuItems.Evidence,
      MenuItems.Dispatch,
      MenuItems.SignatureBook,
      MenuItems.Administration
    ]);
  } else {
    setHiddenMenuItems([
      MenuItems.MailRoom,
      MenuItems.Dispatch,
      MenuItems.Repository,
      MenuItems.RetentionProcess,
      MenuItems.Administration
    ]);
  }
};

export const useMenuItemsWithPermissions = () => {
  const { activeGroup, groups, isAdmin } = useSelector(
    (state: RootStateType) => ({
      activeGroup: state.loginReducer.session.activeGroup,
      groups: state.loginReducer.global.groups,
      isAdmin: state.loginReducer.session.isAdmin
    })
  );

  useEffect(() => {
    changeMenuItemsVisibilityByGroup(!!isAdmin, activeGroup, groups);
  }, [activeGroup, groups, isAdmin]);

  return Object.values(menuItems);
};
