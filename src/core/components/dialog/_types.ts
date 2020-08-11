import {
  AnalogDocument,
  DataboxDocument,
  EmailDocument,
  FileDocument,
  GenericDocument
} from "core/types";
import { SpisumNodeTypes, SubmitToRepositoryDialog } from "enums";
import { Dispatch } from "redux";
import { GroupMember, SslProperties } from "../../api/models";
import { DocumentViewType } from "../documentView/_types";
import { FormValues } from "../MetaForm/_types";
import { TabPropsType } from "./tabs/_types";

export interface TabState {
  isValid: boolean;
  isLoading: boolean;
  isSaving: boolean;
  isSaved: boolean;
  state?: ChannelStateType;
}

export interface DialogReducerStateType {
  allTabsAreSaved: boolean;
  allTabsAreValid: boolean;
  anyTabIsLoading: boolean;
  previewItem: ChannelPreviewItemType;
  showPreview: boolean;

  tabs: { [key: string]: TabState };
}

export interface TabAndDialogChannelType extends TabState {
  // if a tab loads data from an api, calling this method refresh data
  // it's not available for all tabs, as not all tabs loads data from an api
  refreshData?: () => void;
  // after any action is clicked, the triggerValidation clb will be run
  // after its promise is resolved, the dialog will check the TabState.isValid property
  // if it is true - then the action will be triggered, otherwise not
  registerTriggerValidationClb(triggerValidation: () => Promise<void>): void;
  // triggers the async validation (validation result can be set using the setIsValid fn)
  triggerValidation(): Promise<void>;
  // tab is loading some data
  setIsLoading(isLoading: boolean): void;
  // tab data are valid
  setIsValid(isValid: boolean): void;
  // tab is saving its data
  setIsSaving(isSaving: boolean): void;
  // tab data is saved
  setIsSaved(isSaved: boolean): void;
  // state to share data across dialog
  setState(state: ChannelStateType): void;
  // item to be passed to a component which will render a preview
  setPreviewItem(item: ChannelPreviewItemType, showPreview?: boolean): void;
}

export type ChannelsType = {
  [key: string]: TabAndDialogChannelType;
};

export interface DialogTabContentPropsType extends DialogContentPropsType {
  isActive: boolean;
}
export interface DialogContentPropsType {
  channel: TabAndDialogChannelType;
  dialogProps: DialogDataProps;
  onClose?: VoidFunction;
}

export interface ChannelStateType {
  autosaved?: boolean;
  formValues?: FormValues;
  id?: string;
  nodeType?: SpisumNodeTypes;
  preventAction?: boolean;
  selectedComponentsIds?: string[];
  unsavedChangesDialogOpen?: boolean;
}

export type ChannelPreviewItemType = unknown;

export interface ComponentPreviewItem {
  id: string;
  name: string;
  nodeType: string;
  entityId: string;
}

export type SetStateType = (newState: DialogDataProps) => void;
export type StateType = () => DialogDataProps;

export type ActionButtonStateType = {
  setIsPending: (isPending: boolean) => void;
};

export interface ActionType {
  color: "default" | "inherit" | "primary" | "secondary" | undefined;
  colorThemeType?: "success" | "warning" | "error";
  name: string;
  onClick: (props: ActionOnclickType) => void;
  type?: "text" | "outlined" | "contained" | undefined;
}

export interface ActionOnclickType {
  dispatch: Dispatch;
  channels: ChannelsType;
  dialogProps: DialogDataProps;
  onClose: VoidFunction;
  buttonState: ActionButtonStateType;
}

export interface ActionOnCloseType {
  dialogProps: DialogDataProps;
  dispatch: Dispatch;
  channels: ChannelsType;
}

export interface DialogStateType {
  dialogType: DialogType | null;
  dialogProps: DialogDataProps;
}

export enum DialogType {
  AnalogDetails = "analogDetails",
  AnalogDocumentWithSaveButtons = "analogDocumentWithSaveButtons",
  AnalogReadonlyDetails = "analogReadonlyDetails",
  Borrow = "borrow",
  Cancel = "cancel",
  CancelDialog = "cancelDialog",
  CancelDiscardDialog = "cancelDiscardDialog",
  CancelProcessing = "cancelProcessingDialog",
  CancelShipment = "cancelShipment",
  ConvertToOutput = "convertToOutput",
  ChangeFileMark = "changeFileMarkDialog",
  ChangeLocation = "changeLocation",
  ChangePassword = "ChangePassword",
  CloseFile = "CloseFile",
  CreateNewDocumentFile = "createNewDocumentFile",
  CreateOrganizationUnit = "createOrganizationUnit",
  CreateShipment = "createShipment",
  CreateConcept = "createConcept",
  CreateRetentionProposal = "createRetentionProposal",
  CreateUser = "createUser",
  ConceptDetails = "conceptDetails",
  ChangeToA = "changeToA",
  ChangeToS = "changeToS",
  DataboxDetails = "databoxDetails",
  DataModified = "dataModified",
  DeactivateUser = "deactivateUser",
  DeleteOrganizationUnit = "deleteOrganizationUnit",
  DeclineHandover = "declineHandoverDialog",
  DispatchPostShipment = "dispatchPostShipment",
  DispatchPublishShipment = "dispatchPublishShipment",
  DontRegisterDocument = "dontRegisterDocument",
  EditUserDialog = "editUserDialog",
  EmailDetails = "emailDetails",
  FileDetails = "fileDetails",
  FileDetailsReadonly = "fileDetailsReadonly",
  ForSignature = "forSignatureDialog",
  FromSignature = "fromSignatureDialog",
  FoundDialog = "foundDialog",
  GroupChange = "groupChange",
  HandoverDocument = "handoverDocument",
  HandoverDocumentBack = "handoverDocumentBack",
  IncompleteDocument = "incompleteDocument",
  LostDestroyed = "lostDestroyed",
  OpenFile = "openFileDialog",
  OpenShipmentDetail = "OpenShipmentDetail",
  PromoteConceptToDocument = "promoteConceptToDocument",
  RecoverDialog = "recoverDialog",
  RegisterDatabox = "registerDatabox",
  RegisterEmail = "registerEmail",
  RenameComponent = "renameComponent",
  RepositoryAndShreddingPlan = "repositoryAndShreddingPlan",
  ResendShipment = "resendShipment",
  ReturnForRework = "ReturnForRework",
  ReturnShipment = "returnShipment",
  ReturnToRepository = "returnToRepository",
  SendShipment = "sendShipment",
  SettleDocument = "settleDocument",
  ShreddingDiscard = "shreddingDiscard",
  SignAndTimestamp = "signAndTimestamp",
  SubmitTo = "submitTo",
  TakeOutFromFile = "takeOutFromFile",
  TechnicalDataCarriesDetails = "technicalDataCarriesDetails",
  TechnicalDataCarriesDetailsWithSaveButtons = "technicalDataCarriesDetailsWithSaveButtons",
  technicalDataCarriesReadonlyDetails = "technicalDataCarriesReadonlyDetails",
  UpdateOrganizationUnit = "updateOrganizationUnit"
}

export enum DialogTypeWitRegisterButtons {
  analog = DialogType.AnalogDetails,
  digital = DialogType.TechnicalDataCarriesDetails
}

export enum DialogTypeWithSaveButtons {
  analog = DialogType.AnalogDocumentWithSaveButtons,
  digital = DialogType.TechnicalDataCarriesDetailsWithSaveButtons
}

export enum DialogTypeReadOnly {
  analog = DialogType.AnalogReadonlyDetails,
  digital = DialogType.technicalDataCarriesReadonlyDetails
}

// other dialogs can add their data type here. Using the | operator
export type DocumentsType =
  | DocumentViewType
  | DocumentViewType[]
  | GenericDocument
  | File
  | FileDocument
  | AnalogDocument
  | DataboxDocument
  | EmailDocument
  | null
  | undefined;

export interface DialogDataGenericData {
  componentId?: string;
  documentId?: string;
  formValues?: SslProperties;
  groupList?: GroupMember[];
  id?: string;
  nodeType?: SpisumNodeTypes;
  selected?: DocumentsType[];
  entityType?: SubmitToRepositoryDialog;
}

export type DialogDataType =
  | DialogDataGenericData
  | DocumentsType
  | DocumentsType[];

export type DialogDataProps = {
  data?: DialogDataType;
  hideShipmentsTab?: boolean;
  cancelDocumentOwner?: boolean;
  hideManageShipmentsIcon?: boolean;
  canUploadComponents?: boolean;
  disableConverIcon?: boolean;
  dontUseDataModifiedDialog?: boolean;
  isComponentReadonly?: boolean;
  isReadonly?: boolean;
  initiator?: string;
  onClose?: (props: ActionOnCloseType) => void;
  onError?: VoidFunction;
  onSuccess?: VoidFunction;
  parentDialogChannels?: ChannelsType;
  saveOnOpen?: boolean;
  signerComponentId?: string;
  signerVisual?: boolean;
  useAutoSave?: boolean;
};

export type RenderPreviewType =
  | ((
      dialogProps: DialogDataProps,
      previewItem?: ChannelPreviewItemType
    ) => JSX.Element)
  | undefined;

export interface DialogContentType {
  actions?: (dialogProps: DialogDataProps) => ActionType[];
  content?: (props: DialogContentPropsType) => JSX.Element;
  renderPreview?: RenderPreviewType;
  tabs?: TabPropsType[];
  title?: (props: DialogContentPropsType) => JSX.Element;
  type: DialogType;
}
