import { EntityList, File } from "../../entities";
import {
  NodeChildAssociation,
  Pagination,
  SslComponent,
  SuccessResponseType
} from "../models";

export enum ComponentType {
  Document = "document",
  Concept = "concept"
}

export interface DocumentComponentCreateRequestType {
  componentId?: File["id"];
  files: globalThis.File[];
  nodeId: string;
  onEnd?: () => void;
  onError?: (file: globalThis.File) => void;
  onSuccess?: (file: globalThis.File) => void;
  type: ComponentType;
}

export type NodeSecondaryChildrenRequestType = {
  fields?: string[];
  include?: string[];
  includeSource?: boolean;
  maxItems?: number;
  nodeId: string;
  skipCount?: number;
  sortAsc?: boolean | null;
  sortKeys?: string[] | null;
  where?: string; // example: (nodeType='ssl:document')
};
export type ShipmentSecondaryChildrenRequestType = {
  documentId: string;
  nodeId: string;
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

export interface ShipmentComponentsSuccess<Entity> {
  selected: EntityList<Entity>;
  components: EntityList<Entity>;
  loading?: boolean;
  pagination?: Pagination;
}

export interface ComponentResponse<Entity> {
  list: {
    entries: Entity[];
  };
}
