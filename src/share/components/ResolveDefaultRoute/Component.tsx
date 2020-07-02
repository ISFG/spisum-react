import { MenuItemType, SubmenuItemType } from "core/components/menu/_types";
import { SessionStatus } from "core/features/login/_types";
import { useMenuItemsWithPermissions } from "core/hooks/useMenuItemsWithPermissons";
import { CoreRoutes } from "core/routes";
import React from "react";
import { useStore } from "react-redux";
import {
  Redirect,
  Route,
  RouteComponentProps,
  withRouter
} from "react-router-dom";
import { RootStateType, RouterReducerType } from "reducers";
import { AnyAction } from "redux";
import { RootRouterType } from "router";

interface OwnProps {
  defaultChildren?: JSX.Element;
  itemsOfMenu?: MenuItemType[];
  redirectToForAauthorized?: RootRouterType;
  redirectToForUnauthorized?: RootRouterType;
}

const findContentInMenuByUrl = (
  location: string,
  itemsOfMenu: (MenuItemType | SubmenuItemType)[],
  isInHidden: boolean = false
): React.ReactElement | null => {
  for (const item of itemsOfMenu) {
    if (
      item.url &&
      item.url.toLowerCase().trimEnd("/") === location &&
      item.content
    ) {
      return isInHidden ? null : item.content;
    }
    const contentInSubmenu =
      item.submenu &&
      item.submenu.length &&
      findContentInMenuByUrl(
        location,
        item.submenu,
        isInHidden || item.isHidden
      );
    if (contentInSubmenu) {
      return isInHidden ? null : contentInSubmenu;
    }
  }
  return null;
};

const findMenuContent = ({
  defaultRedirect,
  itemsOfMenu,
  location
}: {
  defaultRedirect: RootRouterType;
  itemsOfMenu: (MenuItemType | SubmenuItemType)[];
  location: string;
}) => {
  const content = findContentInMenuByUrl(location, itemsOfMenu);
  return (content && content) || <Redirect to={defaultRedirect} />;
};

const Component = ({
  defaultChildren,
  location,
  itemsOfMenu,
  redirectToForAauthorized = CoreRoutes.DASHBOARD,
  redirectToForUnauthorized = CoreRoutes.LOGIN
}: OwnProps & RouteComponentProps) => {
  const session = useStore<
    RootStateType & RouterReducerType,
    AnyAction
  >().getState().loginReducer.session;

  const itemsOfMenuWithPerms = useMenuItemsWithPermissions();

  if (session && session.status === SessionStatus.AUTHORIZED) {
    return findMenuContent({
      defaultRedirect: redirectToForAauthorized,
      itemsOfMenu: itemsOfMenu || itemsOfMenuWithPerms,
      location: location.pathname.toLowerCase().trimEnd("/")
    });
  }
  if (!defaultChildren) {
    return <Redirect to={redirectToForUnauthorized} />;
  }
  return <Route children={defaultChildren} />;
};

export default withRouter(Component);
