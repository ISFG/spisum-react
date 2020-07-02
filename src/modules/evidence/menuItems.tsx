import AllInboxIcon from "@material-ui/icons/AllInbox";
import { MenuItemType } from "core/components/menu/_types";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import Concepts from "./features/concepts";
import DocumentsForProcessing from "./features/documents/forProcessing";
import DocumentsForProcessed from "./features/documents/processed";
import FilesClosed from "./features/files/closed";
import FilesOpen from "./features/files/open";
import OverviewsCancelled from "./features/overviews/cancelled";
import OverviewsForSignature from "./features/overviews/forSignature";
import OverviewsLostDestroyed from "./features/overviews/lostDestroyed";
import OverviewsRejectedByTakeover from "./features/overviews/rejectedByTakeover";
import OverviewsRented from "./features/overviews/rented";
import OverviewsReturnedForRework from "./features/overviews/returnedForRework";
import OverviewsReturnedFromDispatch from "./features/overviews/returnedFromDispatch";
import ToTakeOver from "./features/toTakeOver";
import WaitingForTakeover from "./features/waitingForTakeover";
import { EvidenceRoutes } from "./routes";

export const menuItems: MenuItemType[] = [
  {
    __testId: "menu-main-evidence",
    icon: <AllInboxIcon />,
    submenu: [
      {
        __testId: "menu-main-evidence-totakeover",
        content: <ToTakeOver />,
        text: t(translationPath(lang.menu.items.toTakeOver)),
        url: EvidenceRoutes.EVIDENCE_TOTAKEOVER
      },
      {
        __testId: "menu-main-evidence-waitingfortakeover",
        content: <WaitingForTakeover />,
        text: t(translationPath(lang.menu.items.waitingForTakeover)),
        url: EvidenceRoutes.EVIDENCE_WAITINGTOTAKEOVER
      },
      {
        __testId: "menu-main-evidence-documents",
        submenu: [
          {
            __testId: "menu-main-evidence-documents-forprocessing",
            content: <DocumentsForProcessing />,
            text: t(translationPath(lang.menu.items.forProcessing)),
            url: EvidenceRoutes.EVIDENCE_DOCUMENTS_FORPROCESSING
          },
          {
            __testId: "menu-main-evidence-documents-processed",
            content: <DocumentsForProcessed />,
            text: t(translationPath(lang.menu.items.processed)),
            url: EvidenceRoutes.EVIDENCE_DOCUMENTS_PROCESSED
          }
        ],
        text: t(translationPath(lang.menu.items.documents))
      },
      {
        __testId: "menu-main-evidence-concepts",
        content: <Concepts />,
        text: t(translationPath(lang.menu.items.concepts)),
        url: EvidenceRoutes.EVIDENCE_CONCEPTS
      },
      {
        __testId: "menu-main-evidence-files",
        submenu: [
          {
            __testId: "menu-main-evidence-files-open",
            content: <FilesOpen />,
            text: t(translationPath(lang.menu.items.open)),
            url: EvidenceRoutes.EVIDENCE_FILES_OPEN
          },
          {
            __testId: "menu-main-evidence-files-closed",
            content: <FilesClosed />,
            text: t(translationPath(lang.menu.items.closed)),
            url: EvidenceRoutes.EVIDENCE_FILES_CLOSED
          }
        ],
        text: t(translationPath(lang.menu.items.files))
      },
      {
        __testId: "menu-main-evidence-overviews",
        submenu: [
          {
            __testId: "menu-main-evidence-overviews-rejectedbytakeover",
            content: <OverviewsRejectedByTakeover />,
            text: t(translationPath(lang.menu.items.rejectedByTakeover)),
            url: EvidenceRoutes.EVIDENCE_OVERVIEWS_REJECTEDBYTAKEOVER
          },
          {
            __testId: "menu-main-evidence-overviews-forsignature",
            content: <OverviewsForSignature />,
            text: t(translationPath(lang.menu.items.forSignature)),
            url: EvidenceRoutes.EVIDENCE_OVERVIEWS_FORSIGNATURE
          },
          {
            __testId: "menu-main-evidence-overviews-returnedforrework",
            content: <OverviewsReturnedForRework />,
            text: t(translationPath(lang.menu.items.returnedForRework)),
            url: EvidenceRoutes.EVIDENCE_OVERVIEWS_RETURNEDFORREWORK
          },
          {
            __testId: "menu-main-evidence-overviews-returnedfromdispatch",
            content: <OverviewsReturnedFromDispatch />,
            text: t(translationPath(lang.menu.items.returnedFromDispatch)),
            url: EvidenceRoutes.EVIDENCE_OVERVIEWS_RETURNEDFROMDISPATCH
          },
          {
            __testId: "menu-main-evidence-overviews-cancel",
            content: <OverviewsCancelled />,
            text: t(translationPath(lang.menu.items.cancel)),
            url: EvidenceRoutes.EVIDENCE_OVERVIEWS_CANCEL
          },
          {
            __testId: "menu-main-evidence-overviews-lostdestroyed",
            content: <OverviewsLostDestroyed />,
            text: t(translationPath(lang.menu.items.lostDestroyed)),
            url: EvidenceRoutes.EVIDENCE_OVERVIEWS_LOSTDESTROYED
          },
          {
            __testId: "menu-main-evidence-overviews-rented",
            content: <OverviewsRented />,
            text: t(translationPath(lang.menu.items.borrowed)),
            url: EvidenceRoutes.EVIDENCE_OVERVIEWS_RENTED
          }
        ],
        text: t(translationPath(lang.menu.items.overviews))
      }
    ],
    text: t(translationPath(lang.menu.items.evidence))
  }
];
