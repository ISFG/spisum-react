import { Group } from "core/entities";
import { DocumentType, SpisumNodeTypes } from "enums";
import { GenericDocument } from "../../types";
import {
  GroupMember,
  Node,
  SslAnalog,
  SslDatabox,
  SslEmail,
  SslProperties
} from "../models";
import {
  documentRegisterActionType,
  documentUpdateActionType
} from "./_actions";

export type DocumentCreateRequestType = {
  nodeType: SpisumNodeTypes.Document;
  nodeId?: string;
  documentType?: DocumentType;
};

export type DocumentCreateSuccessResponseType = {
  entry:
    | Node<SslAnalog>
    | Node<SslEmail>
    | Node<SslDatabox>
    | Node<SslProperties>;
  additionalProperties?: object;
};

export interface DocumentUpdateSaveRequestType<T = SslProperties> {
  nodeId: string;
  body: {
    name?: string;
    nodeType?: string;
    aspectName?: string[];
    properties: T;
  };
}

export type DocumentHandoverRequestType = {
  body: {
    nextGroup: string;
    nextOwner: string;
  };
  nodeId: string;
  nodeType?: string;
  cancelDocumentOwner?: boolean;
};

export interface DocumentDeclineRequestType {
  nodeId: string;
  body: {
    reason: string;
  };
}

export interface DocumentAcceptRequestType {
  nodeId: string;
  nodeType?: string;
}
export interface DocumentCancelDiscardRequestType {
  nodeId: string;
}
export interface DocumentCancelRequestType {
  nodeId: string;
  nodeType?: string;
  body?: {
    reason: string;
  };
}

export interface DocumentRecoverRequestType {
  body: {
    reason: string;
    ids: string[];
  };
}

export interface DocumentFoundRequestType {
  body: {
    ids: string[];
  };
}

export interface DocumentSettleRequestType {
  nodeId: string;
  body: {
    settleMethod: SslProperties["settleMethod"];
    settleDate: SslProperties["settleDate"];
    customSettleMethod?: SslProperties["customSettleMethod"];
    settleReason?: SslProperties["settleReason"];
  };
}

export interface DocumentBaseRequestType {
  payload: {
    nodeId: string;
    body: {
      name?: string;
      nodeType?: string;
      aspectName?: string[];
      properties: SslProperties;
    };
  };
}

export type DocumentRevertVersionRequestType = {
  nodeId: string;
  versionId: string;
};

export interface DocumentSaveAndUpdateRequestType
  extends DocumentBaseRequestType {
  registerAction: typeof documentRegisterActionType;
  updateAction: typeof documentUpdateActionType;
}

export interface SaveDocumentActionType {
  data: SslProperties;
  id: string;
  onError?: VoidFunction;
  onSuccess?: VoidFunction;
}

export type DocumentReadonly = GenericDocument & {
  hideShipmentsTab?: boolean;
};

export type DocumentForSignatureActionType = {
  body: {
    group: string;
    user: string;
  };
  nodeId: string;
};

export type DocumentFromSignatureActionType = {
  nodeId: string;
  visual: boolean;
};

export type DocumentChangeFileMarkRequestType = {
  nodeId: string;
  fileMark: string;
};

export type DocumentBorrowRequestType = {
  body: {
    group: Group["id"];
    user: GroupMember["id"];
  };
  nodeId: Node["id"];
};

export type DocumentChangeToSRequestType = {
  nodeId: string;
};

export type DocumentChangeToARequestType = {
  nodeId: string;
};

export type DocumentShreddingDiscardRequestType = {
  body: {
    date: Date;
    reason: string;
  };
  nodeId: string;
};

export type DocumentChangeLocationRequestType = {
  nodeId: string;
  body: {
    location: string;
  };
};
