import { watchDocumentViewAction } from "core/components/documentView/_sagas";
import { watchEvidenceCancelDialogAction } from "share/components/dialog/evidenceCancelDialog/_sagas";
import { watchFoundDialogAction } from "share/components/dialog/foundDialog/_sagas";
import { watchLostDestroyedDialogAction } from "share/components/dialog/lostDestroyedDialog/_sagas";
import { watchRecoverDialogAction } from "share/components/dialog/recoverDialog/_sagas";
import { watchSettleDocumentDialogAction } from "share/components/dialog/settleDocumentDialog/_sagas";
import { watchSubmitToRepositoryDialogAction } from "share/components/dialog/submitToRepository/_sagas";
import { watchPromoteConceptToDocumentAction } from "../share/components/dialog/promoteConceptToDocumentDialog/_sagas";
import { watchShipmentsAction } from "../share/components/dialog/sendShipmentDialog/_sagas";
import { watchAddComments, watchFetchComments } from "./api/comments/_sagas";
import {
  watchComponentCreateAction,
  watchComponentDeleteAction,
  watchComponentDownloadAction,
  watchComponentUpdateAction,
  watchComponentViewAction,
  watchComponentViewShipmentAction
} from "./api/components/_sagas";
import { watchApiConceptComponentsSagas } from "./api/concept/components/_sagas";
import { watchApiConceptSagas } from "./api/concept/_sagas";
import { watchDataboxDontRegister } from "./api/databox/_sagas";
import { watchApiDocumentSaga } from "./api/document/_sagas";
import {
  watchEmailDontRegister,
  watchEmailIncomplete
} from "./api/email/_sagas";
import { watchApiEvidenceSaga } from "./api/evidence/_sagas";
import { watchApiFileActions } from "./api/file/_sagas";
import { watchGetGroupMembers } from "./api/groups/members/_sagas";
import { watchGetGroups } from "./api/groups/_sagas";
import {
  watchFetchNodeChildrenAction,
  watchNodeContentAction,
  watchNodeDetailsAction,
  watchNodeHistoryAction,
  watchNodeShipmentAction,
  watchNodeVersionAction
} from "./api/node/_sagas";
import { watchFetchSearchAction } from "./api/search/_sagas";
import { watchShipmentActions } from "./api/shipment/_sagas";
import { watchUserActions } from "./api/user/_sagas";
import { watchCommentsAction } from "./components/dialog/tabs/comments/_sagas";
import { watchShipmentTabActionsAction } from "./components/dialog/tabs/shipment/_sagas";
import {
  watchUploadFileAction,
  watchUploadFileWithNotificationAction
} from "./features/fileUpload/_sagas";
import { watchHttpSagas } from "./features/httpClient/_sagas";
import { watchCoreActions } from "./_sagas";
import { watchDiscardCancelDialogAction } from "../share/components/dialog/cancelDiscardDialog/_sagas";
import { watchDailyImprint } from "./api/imprint/_sagas";

export default [
  // http sagas should be always first, other sagas rely on correct http client settings
  // which are handled by the http sagas
  watchHttpSagas,
  // here we can sort by alphabet
  watchAddComments,
  watchApiConceptComponentsSagas,
  watchApiConceptSagas,
  watchApiDocumentSaga,
  watchApiEvidenceSaga,
  watchApiFileActions,
  watchCommentsAction,
  watchComponentCreateAction,
  watchComponentDeleteAction,
  watchComponentDownloadAction,
  watchComponentUpdateAction,
  watchComponentViewAction,
  watchComponentViewShipmentAction,
  watchCoreActions,
  watchDataboxDontRegister,
  watchDocumentViewAction,
  watchEmailDontRegister,
  watchEmailIncomplete,
  watchEvidenceCancelDialogAction,
  watchDiscardCancelDialogAction,
  watchFetchComments,
  watchFetchNodeChildrenAction,
  watchFetchSearchAction,
  watchFoundDialogAction,
  watchGetGroupMembers,
  watchGetGroups,
  watchDailyImprint,
  watchLostDestroyedDialogAction,
  watchNodeContentAction,
  watchNodeDetailsAction,
  watchNodeHistoryAction,
  watchNodeShipmentAction,
  watchNodeVersionAction,
  watchPromoteConceptToDocumentAction,
  watchRecoverDialogAction,
  watchSettleDocumentDialogAction,
  watchShipmentActions,
  watchShipmentsAction,
  watchShipmentTabActionsAction,
  watchSubmitToRepositoryDialogAction,
  watchUploadFileAction,
  watchUploadFileWithNotificationAction,
  watchUserActions
];
