// import mailRoomReducers from "./modules/mailRoom/reducers"
import { RouterActionType } from "connected-react-router";
import commentsReducer from "core/components/dialog/tabs/comments/_reducer";
import componentsReducer from "core/components/dialog/tabs/components/_reducer";
import { historyReducer } from "core/components/dialog/tabs/history/_reducer";
import { shipmentTabReducer } from "core/components/dialog/tabs/shipment/_reducer";
import { versionReducer } from "core/components/dialog/tabs/version/_reducer";
import dialogReducer from "core/components/dialog/_reducer";
import documentViewReducer from "core/components/documentView/_reducer";
import layoutReducer from "core/components/layout/_reducer";
import metaFormReducer from "core/components/MetaForm/_reducer";
import automaticLogoutDialogReducer from "core/features/automaticLogout/_reducer";
import loginReducer from "core/features/login/_reducer";
import { Location, LocationState } from "history";
import { searchFilesReducer } from "share/components/dialog/createNewDocumentFileDialog/_reducer";
import { StateType } from "typesafe-actions";
import { databoxReducer } from "./core/api/databox/_reducer";
import { emailReducer } from "./core/api/email/_reducer";
import { groupMembersReducer } from "./core/api/groups/members/_reducer";
import { historyShipmentReducer } from "./core/components/dialog/tabs/historyShipment/_reducer";
import { componentShipmentReducer } from "./core/components/dialog/tabs/shipmentComponents/_reducer";
import { tableOfContentsReducer } from "./core/components/dialog/tabs/tableOfContents/_reducer";
import { notificationReducer } from "./core/components/notifications/_reducer";
import { fileUploadReducer } from "./core/features/fileUpload/_reducer";
import { nodePreviewReducer } from "./core/features/nodePreview/_reducer";
import { conceptComponentsReducer } from "./modules/evidence/components/components/_reducer";
import { shipmentsReducer } from "./share/components/dialog/sendShipmentDialog/_reducer";

export const reducers = {
  automaticLogoutDialogReducer,
  commentsReducer,
  componentShipmentReducer,
  componentsReducer,
  conceptComponentsReducer,
  databoxReducer,
  dialogReducer,
  documentViewReducer,
  emailReducer,
  fileUploadReducer,
  groupMembersReducer,
  historyReducer,
  historyShipmentReducer,
  layoutReducer,
  loginReducer,
  metaFormReducer,
  nodePreviewReducer,
  notificationReducer,
  searchFilesReducer,
  shipmentTabReducer,
  shipmentsReducer,
  tableOfContentsReducer,
  versionReducer
};

export default reducers;

export interface RouterReducerType<T = LocationState> {
  router: {
    location: Location<T>;
    action: RouterActionType;
  };
}

export type RootStateType = StateType<typeof reducers>;
