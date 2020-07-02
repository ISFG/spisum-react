import {
  NodeChildAssociation,
  NodeHistory,
  NodeVersion,
  SslAnalog,
  SslDatabox,
  SslEmail,
  SslFile,
  SslProperties,
  SslShipment,
  SuccessResponseType
} from "../models";

export type NodeChildrenRequestType = {
  fields?: string[];
  include?: string[];
  includeSource?: boolean;
  maxItems?: number;
  nodeId?: string;
  orderBy?: string[];
  relativePath?: string;
  skipCount?: number;
  where?: string; // example: (nodeType='ssl:document')
};

export type NodeChildrenSuccessResponseType = SuccessResponseType<
  | NodeChildAssociation<SslEmail>
  | NodeChildAssociation<SslDatabox>
  | NodeChildAssociation<SslAnalog>
  | NodeChildAssociation<SslProperties>
  | NodeChildAssociation<SslFile>
  | NodeChildAssociation<SslShipment>
>;

export type DocumentCreateRequestType = {
  nodeType: string;
  path?: string;
  documentType?: string;
};

export type DocumentCreateSuccessResponseType = {
  id?: string;
  pid?: string;
};

export type NodeHistoryRequestType = {
  nodeId: string;
  nodeType?: string;
  skipCount?: number;
  maxItems?: number;
};

export type NodeHistorySuccessResponseType = SuccessResponseType<NodeHistory>;

export type NodeContentRequestType = {
  name: string;
  nodeId: string;
  nodeType: string;
  componentId: string;
};

export type NodeVersionRequestType = {
  nodeId: string;
  skipCount?: number;
  maxItems?: number;
};

export type NodeVersionSuccessResponseType = SuccessResponseType<NodeVersion>;
