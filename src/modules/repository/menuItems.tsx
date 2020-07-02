import StorageIcon from "@material-ui/icons/Storage";
import { MenuItemType } from "core/components/menu/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import Rented from "./features/rented";
import StoredDocuments from "./features/storedDocuments";
import StoredFiles from "./features/storedFiles";
import ToTakeOver from "./features/toTakeOver";
import { RepositoryRoutes } from "./routes";

export const menuItems: MenuItemType[] = [
  {
    __testId: "menu-main-repository",
    icon: <StorageIcon />,
    submenu: [
      {
        __testId: "menu-main-repository-totakeover",
        content: <ToTakeOver />,
        text: t(translationPath(lang.menu.items.toTakeOver)),
        url: RepositoryRoutes.REPOSITORY_TOTAKEOVER
      },
      {
        __testId: "menu-main-repository-storeddocuments",
        content: <StoredDocuments />,
        text: t(translationPath(lang.menu.items.storedDocuments)),
        url: RepositoryRoutes.REPOSITORY_STOREDDOCUMENTS
      },
      {
        __testId: "menu-main-repository-storedfiles",
        content: <StoredFiles />,
        text: t(translationPath(lang.menu.items.storedFiles)),
        url: RepositoryRoutes.REPOSITORY_STOREDFILES
      },
      {
        __testId: "menu-main-repository-rented",
        content: <Rented />,
        text: t(translationPath(lang.menu.items.rented)),
        url: RepositoryRoutes.REPOSITORY_RENTED
      }
    ],
    text: t(translationPath(lang.menu.items.repository))
  }
];
