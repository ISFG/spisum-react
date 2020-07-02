import { File } from "../../../entities";
import {
  NodeChildAssociation,
  SslComponent,
  SuccessResponseType
} from "../../models";

export interface ComponentCreateRequestType {
  componentId?: File["id"];
  files: globalThis.File[];
  nodeId: string;
  onSuccess?: (file: globalThis.File) => void;
  onError?: (file: globalThis.File) => void;
  onEnd?: () => void;
}

export type NodeSecondaryChildrenRequestType = {
  fields?: string[];
  include?: string[];
  includeSource?: boolean;
  maxItems?: number;
  nodeId: string;
  sortAsc?: boolean | null;
  sortKeys?: string[] | null;
  skipCount?: number;
  where?: string; // example: (nodeType='ssl:document')
};

export type GetComponentsSuccessType = SuccessResponseType<
  NodeChildAssociation<SslComponent>
>;

export type DeleteComponentsRequestType = {
  componentIds: File["id"][];
  nodeId: string;
};

export type DownloadComponentsRequestType = {
  componentIds: File["id"][];
  nodeId: string;
  nodeType?: string;
};
