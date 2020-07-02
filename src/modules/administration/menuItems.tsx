import { SupervisorAccount } from "@material-ui/icons";
import { MenuItemType } from "core/components/menu/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import Certificates from "./features/certificates";
import DailyImprint from "./features/dailyImprint";
import OrganizationUnits from "./features/organizationUnits";
import Users from "./features/users";
import { AdministrationRoutes } from "./routes";

export const menuItems: MenuItemType[] = [
  {
    __testId: "menu-main-administration",
    icon: <SupervisorAccount />,
    submenu: [
      {
        __testId: "menu-main-administration-certificate",
        content: <Certificates />,
        text: t(translationPath(lang.menu.items.certificate)),
        url: AdministrationRoutes.ADMINISTRATION_CERTIFICATE
      },
      {
        __testId: "menu-main-administration-organization-unit",
        content: <OrganizationUnits />,
        text: t(translationPath(lang.menu.items.organizationUnits)),
        url: AdministrationRoutes.ADMINISTRATION_ORGANIZATION_UNIT
      },
      {
        __testId: "menu-main-administration-organization-users",
        content: <Users />,
        text: t(translationPath(lang.menu.items.users)),
        url: AdministrationRoutes.ADMINISTRATION_USERS
      },
      {
        __testId: "menu-main-administration-daily-imprints",
        submenu: [
          {
            __testId: "menu-main-administration-daily-imprints-overview",
            content: <DailyImprint />,
            text: t(translationPath(lang.menu.items.overview)),
            url: AdministrationRoutes.ADMINISTRATION_DAILY_IMPRINT
          }
        ],
        text: t(translationPath(lang.menu.items.dailyImprint))
      }
    ],
    text: t(translationPath(lang.menu.items.administration))
  }
];
