import NearMeIcon from "@material-ui/icons/NearMe";
import { MenuItemType } from "core/components/menu/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import Sent from "./features/dispatched";
import DispatchingByPost from "./features/dispatching/byPost";
import DispatchingByPublishing from "./features/dispatching/byPublishing";
import { DispatchRoutes } from "./routes";

export const menuItems: MenuItemType[] = [
  {
    __testId: "menu-main-dispatch",
    icon: <NearMeIcon />,
    submenu: [
      {
        __testId: "menu-main-dispatch-dispatching",
        submenu: [
          {
            __testId: "menu-main-dispatch-dispatching-bypost",
            content: <DispatchingByPost />,
            text: t(translationPath(lang.menu.items.byPost)),
            url: DispatchRoutes.DISPATCH_DISPATCHING_BYPOST
          },
          {
            __testId: "menu-main-dispatch-dispatching-bypublishing",
            content: <DispatchingByPublishing />,
            text: t(translationPath(lang.menu.items.byPublishing)),
            url: DispatchRoutes.DISPATCH_DISPATCHING_BYPUBLISHING
          }
        ],
        text: t(translationPath(lang.menu.items.toDispatch))
      },
      {
        __testId: "menu-main-dispatch-dispatched",
        content: <Sent />,
        text: t(translationPath(lang.menu.items.dispatched)),
        url: DispatchRoutes.DISPATCH_DISPATCHED
      }
    ],
    text: t(translationPath(lang.menu.items.dispatch))
  }
];
