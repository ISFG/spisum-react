import SaveAltIcon from "@material-ui/icons/SaveAlt";
import { RootActionsType } from "actions";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { MenuItemType } from "core/components/menu/_types";
import React, { Dispatch } from "react";
import { createAnalogDocument } from "share/components/dialog/analogDetailsDialog/_actions";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createTechnicalDataCarriesDocument } from "share/components/dialog/technicalDataCarriesDetailsDialog/_actions";
import IncomeDigitalDocumentDataBoxNotRegistered from "./features/income/digitalDocument/dataBox/notRegistered";
import IncomeDigitalDocumentDataBoxUnprocessed from "./features/income/digitalDocument/dataBox/unprocessed";
import IncomeDigitalDocumentEmailBoxNotRegistered from "./features/income/digitalDocument/emailBox/notRegistered";
import IncomeDigitalDocumentEmailBoxUnprocessed from "./features/income/digitalDocument/emailBox/unprocessed";
import NotPassed from "./features/notPassed";
import Unfinished from "./features/unfinished";
import WaitingForTakeover from "./features/waitingForTakeover";
import { MailroomRoutes } from "./routes";

export const menuItems: MenuItemType[] = [
  {
    __testId: "menu-main-mailroom",
    icon: <SaveAltIcon />,
    submenu: [
      {
        __testId: "menu-main-mailroom-income",
        redirectTo: MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_EMAILBOX,
        submenu: [
          {
            __testId: "menu-main-mailroom-income-analogdocument",
            onClick: (dispatch: Dispatch<RootActionsType>) =>
              dispatch(
                createAnalogDocument({
                  onClose: ({ channels }) => {
                    if (channels.Metadata.state?.autosaved) {
                      dispatch(documentViewAction__Refresh(true));
                    }
                  }
                })
              ),
            text: t(translationPath(lang.menu.items.analogDocument))
          },
          {
            __testId: "menu-main-mailroom-income-digitaldocument",
            submenu: [
              {
                __testId: "menu-main-mailroom-income-digitaldocument-emailbox",
                redirectTo:
                  MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_EMAILBOX_UNPROCESSED,
                submenu: [
                  {
                    __testId:
                      "menu-main-mailroom-income-digitaldocument-emailbox-unprocessed",
                    content: <IncomeDigitalDocumentEmailBoxUnprocessed />,
                    text: t(translationPath(lang.menu.items.unprocessed)),
                    url:
                      MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_EMAILBOX_UNPROCESSED
                  },
                  {
                    __testId:
                      "menu-main-mailroom-income-digitaldocument-emailbox-notregistered",
                    content: <IncomeDigitalDocumentEmailBoxNotRegistered />,
                    text: t(translationPath(lang.menu.items.notRegistered)),
                    url:
                      MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_EMAILBOX_NOTREGISTERED
                  }
                ],
                text: t(translationPath(lang.menu.items.emailBox)),
                url: MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_EMAILBOX
              },
              {
                __testId: "menu-main-mailroom-income-digitaldocument-databox",
                redirectTo:
                  MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_DATABOX_UNPROCESSED,
                submenu: [
                  {
                    __testId:
                      "menu-main-mailroom-income-digitaldocument-databox-unprocessed",
                    content: <IncomeDigitalDocumentDataBoxUnprocessed />,
                    text: t(translationPath(lang.menu.items.unprocessed)),
                    url:
                      MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_DATABOX_UNPROCESSED
                  },
                  {
                    __testId:
                      "menu-main-mailroom-income-digitaldocument-databox-notregistered",
                    content: <IncomeDigitalDocumentDataBoxNotRegistered />,
                    text: t(translationPath(lang.menu.items.notRegistered)),
                    url:
                      MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_DATABOX_NOTREGISTERED
                  }
                ],
                text: t(translationPath(lang.menu.items.dataBox)),
                url: MailroomRoutes.MAILROOM_INCOME_DIGITALDOCUMENT_DATABOX
              },
              {
                __testId:
                  "menu-main-mailroom-income-digitaldocument-databox-technicaldataCarries",
                onClick: (dispatch: Dispatch<RootActionsType>) =>
                  // This is only temporary action, sagas will dispatch this action
                  dispatch(
                    createTechnicalDataCarriesDocument({
                      onClose: ({ channels }) => {
                        if (channels.Metadata.state?.autosaved) {
                          dispatch(documentViewAction__Refresh(true));
                        }
                      }
                    })
                  ),
                text: t(translationPath(lang.menu.items.technicalDataCarries))
              }
            ],
            text: t(translationPath(lang.menu.items.digitalDocument))
          }
        ],
        text: t(translationPath(lang.menu.items.income)),
        url: MailroomRoutes.MAILROOM_INCOME
      },
      {
        __testId: "menu-main-mailroom-unfinished",
        content: <Unfinished />,
        text: t(translationPath(lang.menu.items.unfinished)),
        url: MailroomRoutes.MAILROOM_UNFINISHED
      },
      {
        __testId: "menu-main-mailroom-notpassed",
        content: <NotPassed />,
        text: t(translationPath(lang.menu.items.notPassed)),
        url: MailroomRoutes.MAILROOM_NOTPASSED
      },
      {
        __testId: "menu-main-mailroom-waitingfortakeover",
        content: <WaitingForTakeover />,
        text: t(translationPath(lang.menu.items.waitingForTakeover)),
        url: MailroomRoutes.MAILROOM_WAITINGFORTAKEOVER
      }
    ],
    text: t(translationPath(lang.menu.items.mailroom))
  }
];
