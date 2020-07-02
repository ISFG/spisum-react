import GestureIcon from "@material-ui/icons/Gesture";
import { MenuItemType } from "core/components/menu/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import ForSignature from "./features/forSignature";
import { SignatureBookRoutes } from "./routes";

export const menuItems: MenuItemType[] = [
  {
    __testId: "menu-main-signaturebook",
    icon: <GestureIcon />,
    submenu: [
      {
        __testId: "menu-main-signaturebook-forsignature",
        content: <ForSignature />,
        text: t(translationPath(lang.menu.items.forSignature)),
        url: SignatureBookRoutes.SIGNATUREBOOK_FORSIGNATURE
      } /*, v1.1
      {
        __testId: "menu-main-signaturebook-signed",
        content: <Signed />,
        text: t(translationPath(lang.menu.items.signed)),
        url: SignatureBookRoutes.SIGNATUREBOOK_SIGNED
      }*/
    ],
    text: t(translationPath(lang.menu.items.signatureBook))
  }
];
