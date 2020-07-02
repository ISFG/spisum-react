import { Group } from "core/entities";
import { GroupMember, Node, SslFile, SslProperties } from "../models";

export type CreateFileRequestType = {
  documentId: string;
};

export type AddFileRequestType = {
  nodeId: string;
  documentIds: string[];
};

export interface FileRequestType {
  documentId: string;
}

export interface CancelFileRequestType {
  nodeId: string;
  body?: {
    reason: string;
  };
}
export interface FileCancelDiscardRequestType {
  nodeId: string;
}
export interface CloseFileRequestType {
  nodeId: string;
  body: {
    settleMethod: SslProperties["settleMethod"];
    settleDate: SslProperties["settleDate"];
    customSettleMethod?: SslProperties["customSettleMethod"];
    settleReason?: SslProperties["settleReason"];
  };
}

export interface RecoverFilesRequestType {
  body: {
    reason: string;
    ids: string[];
  };
}

export interface FoundFilesRequestType {
  body: {
    ids: string[];
  };
}

export interface UpdateFileRequestType {
  nodeId: string;
  properties: SslFile;
}

export type FileChangeFileMarkRequestType = {
  nodeId: string;
  fileMark: string;
};

export type BorrowFileRequestType = {
  body: {
    group: Group["id"];
    user: GroupMember["id"];
  };
  nodeId: Node["id"];
};

export type FileChangeToSRequestType = {
  nodeId: string;
};

export type FileChangeToARequestType = {
  nodeId: string;
};

export type DiscardShreddingFileRequestType = {
  body: {
    date: Date;
    reason: string;
  };
  nodeId: string;
};

export type FileChangeLocationRequestType = {
  nodeId: string;
  body: {
    location: string;
  };
};
