import { RootActionsType } from "actions";
import React from "react";
import { Dispatch } from "redux";
import { RootRouterType } from "router";

export interface SubmenuItemType {
  __testId?: string;
  content?: React.ReactElement;
  icon?: React.ReactElement;
  isHidden?: boolean;
  onClick?: (dispatch: Dispatch<RootActionsType>) => void;
  redirectTo?: RootRouterType;
  submenu?: SubmenuItemType[];
  text?: string;
  url?: RootRouterType;
}

export interface MenuItemType extends SubmenuItemType {
  isDivider?: boolean;
}
