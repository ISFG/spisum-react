import ArchiveIcon from "@material-ui/icons/Archive";
import { MenuItemType } from "core/components/menu/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import Archived from "./features/archived";
import Destroyed from "./features/destroyed";
import RecordRetentionProcessRetentionProposal from "./features/recordRetentionProcess/retentionProposal";
import RecordRetentionProcessRetentionProtocol from "./features/recordRetentionProcess/retentionProtocol";
import ToDispose from "./features/toDispose";
import { RecordRetentionProcessRoutes } from "./routes";

export const menuItems: MenuItemType[] = [
  {
    __testId: "menu-main-recordretentionprocess",
    icon: <ArchiveIcon />,
    submenu: [
      {
        __testId: "menu-main-recordretentionprocess-todispose",
        content: <ToDispose />,
        text: t(translationPath(lang.menu.items.toDispose)),
        url: RecordRetentionProcessRoutes.RECORDRETENTIONPROCESS_TODISPOSE
      },
      {
        __testId: "menu-main-recordretentionprocess-recordretentionprocess",
        submenu: [
          {
            __testId:
              "menu-main-recordretentionprocess-recordretentionprocess-retentionproposal",
            content: <RecordRetentionProcessRetentionProposal />,
            text: t(translationPath(lang.menu.items.retentionProposal)),
            url:
              RecordRetentionProcessRoutes.RECORDRETENTIONPROCESS_RETENTIONPROPOSAL
          },
          {
            __testId:
              "menu-main-recordretentionprocess-recordretentionprocess-retentionprotocol",
            content: <RecordRetentionProcessRetentionProtocol />,
            text: t(translationPath(lang.menu.items.retentionProtocol)),
            url:
              RecordRetentionProcessRoutes.RECORDRETENTIONPROCESS_RETENTIONPROTOCOL
          }
        ],
        text: t(translationPath(lang.menu.items.recordRetentionProcess))
      },
      {
        __testId: "menu-main-recordretentionprocess-archived",
        content: <Archived />,
        text: t(translationPath(lang.menu.items.archived)),
        url: RecordRetentionProcessRoutes.RECORDRETENTIONPROCESS_ARCHIVED
      },
      {
        __testId: "menu-main-recordretentionprocess-destroyed",
        content: <Destroyed />,
        text: t(translationPath(lang.menu.items.destroyed)),
        url: RecordRetentionProcessRoutes.RECORDRETENTIONPROCESS_DESTROYED
      }
    ],
    text: t(translationPath(lang.menu.items.recordRetentionProcess))
  }
];
