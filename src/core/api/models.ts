import { FileMetaType } from "core/entities/file/File";
import { GenericDocument } from "core/types";
import { Associations, SendModeValues, SpisumNodeTypes } from "enums";

export type Node<T = {}> = {
  allowableOperations?: string[];
  aspectNames?: string[];
  content?: ContentInfo;
  createdAt: Date;
  createdByUser: UserInfo;
  id: string;
  isFavorite?: boolean;
  isFile: boolean;
  isFolder: boolean;
  isLink?: boolean;
  isLocked?: boolean;
  modifiedAt: string;
  modifiedByUser: UserInfo;
  name: string;
  nodeType: SpisumNodeTypes;
  parentId?: string;
  path?: PathInfo;
  permissions?: PermissionsInfo;
  properties?: {
    cm?: CmProperties;
    ssl?: T;
  };
};

export type NodeChildAssociation<T> = Node<T> & {
  additionalProperties?: object;
  association?: ChildAssociationInfo;
};

export type NodeChildAssociationEntry<T> = {
  entry: NodeChildAssociation<T>;
};

export type ContentInfo = {
  encoding?: string;
  mimeType: string;
  mimeTypeName: string;
  sizeInBytes: number;
};

export type PathInfo = {
  elements?: PathElement[];
  name?: string;
  isComplete?: boolean;
};

export type PermissionsInfo = {
  isInheritanceEnabled?: boolean;
  inherited?: PermissionElement[];
  locallySet?: PermissionElement[];
  settable?: string[];
};

export type ChildAssociationInfo = {
  assocType: Associations;
  isPrimary: boolean;
};

export type PathElement = {
  aspectNames?: string[];
  id?: string;
  name?: string;
  nodeType?: SpisumNodeTypes;
};

export type PermissionElement = {
  accessStatus?: "ALLOWED" | "DENIED";
  authorityId?: string;
  name?: string;
};

export type UserInfo = {
  displayName: string;
  id: string;
};

export interface NodeHistory {
  description: string;
  eventType: string;
  id: string;
  occuredAt: Date;
  pid: string;
  userId: string;
}

export type NodeVersion = Pick<
  Node,
  "id" | "modifiedAt" | "modifiedByUser" | "nodeType"
>;

export type ShipmentHistory = {
  occuredAt: Date;
  userId: string;
  description: string;
  eventType: string;
  id: string;
};
// In Alfresco schema all fields are mandatory, but it doesn't make sense
export type Comment = {
  canDelete?: boolean;
  canEdit?: boolean;
  content: string;
  createdAt?: string;
  createdBy?: Person;
  edited?: boolean;
  id?: string;
  modifiedAt?: string;
  modifiedBy?: Person;
  title?: string;
};

export type Person = {
  aspectNames?: string[];
  avatarId?: string;
  capabilities?: object;
  company?: Company;
  description?: string;
  displayName?: string;
  email: string;
  emailNotificationsEnabled?: boolean;
  enabled: boolean;
  firstName: string;
  googleId?: string;
  id: string;
  instantMessageId?: string;
  jobTitle?: string;
  lastName?: string;
  location?: string;
  mobile?: string;
  properties?: object;
  skypeId?: string;
  statusUpdatedAt?: string;
  telephone?: string;
  userStatus?: string;
};

export type Company = {
  address1?: string;
  address2?: string;
  address3?: string;
  email?: string;
  fax?: string;
  organization?: string;
  postcode?: string;
  telephone?: string;
};

export type GroupMember = {
  id: string;
  displayName: string;
  memberType: GroupMemberType;
};

export enum GroupMemberType {
  group = "GROUP",
  person = "PERSON"
}

export type SslProperties = {
  CDCount?: number | string;
  USBCount?: number | string;
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  associationCount?: number;
  attachmentsCount?: number | string;
  attachmentsType?: string;
  borrowDate?: string | Date | null;
  borrower?: string; // check mandatory
  canBeSigned?: boolean;
  cancelDate?: Date;
  cancelReason?: string;
  closureDate?: Date | null;
  componentType?: FileMetaType;
  createdAt?: Date | null;
  createdDate?: Date | null;
  currentOwner?: string;
  customAuditCode?: string; // check mandatory
  databoxRecipientUid?: string;
  dateFrom?: Date;
  dateOfEvidence?: Date;
  dateTo?: Date | null;
  decisionDA?: string;
  deliveryDate?: Date;
  deliveryMode?: string;
  deliveryTime?: Date;
  description?: string;
  discardTo?: Date;
  dispatchDate?: Date;
  dispatchedDate?: Date;
  documentType?: string;
  emailAddress?: string;
  eraseDate?: Date;
  fileIdentificator?: string;
  fileIsReadable?: boolean;
  fileMark?: string;
  fileName?: string;
  filePlan?: string;
  forSignatureDate?: Date;
  form?: string;
  group?: string;
  internalState?: string;
  isSign?: boolean;
  isSealed?: boolean;
  itemId?: string;
  listCount?: number | string;
  listCountAttachments?: number;
  location?: string;
  lostDate?: Date;
  lostReason?: string;
  nextGroup?: string;
  nextOwner?: string;
  openSheetCount?: number | string;
  originalDestinationHandover?: string;
  originalDispatchDate?: Date;
  passedFrom?: string;
  pid?: string;
  pidRef?: string;
  postItemType?: string;
  processor?: string;
  reasonForReturn?: string;
  recipient?: string;
  ref?: string;
  repositoryName?: string;
  retentionMark?: string;
  retentionMode?: string;
  retentionPeriod?: number | null;
  returnedForReworkDate?: Date;
  sendMode?: string;
  sender?: string;
  senderIdent?: string;
  senderSSID?: string;
  senderType?: string;
  sender_address?: string;
  sender_contact?: string;
  sender_job?: string;
  sender_name?: string;
  sender_orgName?: string;
  sender_orgUnit?: string;
  serialNumber?: number | string;
  settleDate?: Date | null;
  settleMethod?: string;
  customSettleMethod?: string;
  settleReason?: string;
  settleTime?: Date;
  settleToDate?: Date | null;
  shreddingDate?: string | Date | null;
  shreddingYear?: number;
  signedAuthor?: string;
  signedDate?: Date;
  sip?: string;
  ssid?: string;
  ssidNumber?: number;
  state?: string;
  subject?: string;
  targetRecipient?: string;
  typeOfDelivery?: string;
  user?: string;
  usedTime?: Date | null;
  volumesCount?: number | string;
  takeRef?: string;
  triggerActionId?: string;
  triggerActionYear?: string;
  toDispatchDate?: string | Date | null;
  toRepositoryDate?: string | Date | null;
  toArchiveShreddingDate?: string | Date | null;
  borrowReturnDate?: string | Date | null;
  shreddingResolution?: string;
  idDA?: string;
  waitingRef?: string;
};

export type SslEmail = SslProperties & {
  emailAttachmentsCount: number;
  emailDeliveryDate: Date;
  emailDeliveryTime?: Date;
  emailMessageId?: string;
  emailNotRegisteredReason?: string;
  emailRecipient?: string;
  emailRecipientName?: string;
  emailSender: string;
  emailSenderName?: string;
  emailSubject: string;
};

export type SslDatabox = SslProperties & {
  databoxAcceptanceTime?: Date;
  databoxAllowSubstDelivery?: boolean;
  databoxAttachmentsCount: number;
  databoxDeliveryDate: Date;
  databoxDeliveryTime?: Date;
  databoxLegalTitleLaw?: string;
  databoxLegalTitlePar?: string;
  databoxLegalTitlePoint?: string;
  databoxLegalTitleSect?: string;
  databoxLegalTitleYear?: string;
  databoxMessageState?: string;
  databoxMessageType?: string;
  databoxNotRegisteredReason?: string;
  databoxPersonalDelivery?: boolean;
  databoxRecipient: string;
  databoxRecipientAddress?: string;
  databoxRecipientDataBoxType?: string;
  databoxRecipientDocumentIdent?: string;
  databoxRecipientDocumentRefNumber?: string;
  databoxRecipientName: string;
  databoxSender: string;
  databoxSenderAddress?: string;
  databoxSenderDataBoxType?: string;
  databoxSenderIdent?: string;
  databoxSenderName: string;
  databoxSenderRefNumber?: string;
  databoxSubject: string;
  databoxToHands?: string;
};

export type CmProperties = {
  owner?: UserInfo;
};

export type SslAnalog = SslProperties & {
  id?: string;
};

export type SslAnalogWithOwner = SslAnalog & {
  owner?: string;
};

export type SslConcept = SslAnalogWithOwner;

export type SslDocument = SslProperties;
export type SslFile = SslProperties;
export type SslDataboxComponent = SslDatabox;
export type SslEmailComponent = SslEmail;

export type SslComponent = SslProperties & {
  fileName?: string;
  fileIsInOutputFormat: string;
  fileIsSigned: boolean;
  keepForm: string;
};

export type SslDataFolder = {
  timestampText?: string;
};

export type SslShipment = SslProperties & {
  address1: string;
  address2?: string;
  address3?: string;
  address4?: string;
  addressCity?: string;
  addressState?: string;
  addressStreet?: string;
  addressZip?: string;
  allowSubstDelivery: boolean;
  components: string[];
  dmID: string;
  fake?: string;
  legalTitleLaw: number;
  legalTitlePar: number;
  legalTitlePoint: string;
  legalTitleSect: string;
  legalTitleYear: number;
  nodeName: string;
  personalDelivery: boolean;
  postItemId?: string;
  postItemNumber?: string;
  postItemPrice: number | string;
  postItemType?: string;
  postItemTypeOther?: string;
  postItemWeight?: number | string;
  postType?: string;
  postTypeOther?: string;
  recipient?: string;
  sender?: string;
  sendMode: SendModeValues;
  shComponentsRef?: string;
  shEmailBody?: string;
  shFilesSize?: number;
  shRef?: string;
  shRefId?: string;
  subject?: string;
  toDispatchDate?: string;
  toHands?: string;
};

export type Pagination = {
  count: number;
  hasMoreItems: boolean;
  maxItems: number;
  skipCount: number;
  totalItems?: number;
};

export type SuccessResponseType<T, K = {}> = {
  list: {
    entries?: { entry: T }[];
    pagination?: Pagination;
    source?: K;
  };
};

export type SuccessListResponseType<T, K = {}> = {
  list: {
    entries?: { entry: T }[];
    pagination?: Pagination;
    source?: K;
  };
};

export type ErrorResponseType = {
  error: {
    errorKey?: string;
    statusCode: number;
    briefSummary: string;
    stackTrace: string;
    descriptionURL: string;
    logId?: string;
  };
};

export type NodeSuccessResponseType = {
  entry: GenericDocument;
};
