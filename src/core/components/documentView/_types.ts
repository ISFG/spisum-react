import { Folder } from "core/types";
import { FetchStateType } from "types";

export interface AlfrescoQuery {
  include?: string[];
  query: {
    query: string;
    language?: string;
  };
}

export interface AlfrescoChildren {
  include?: string[];
  includeSource?: boolean;
  nodeId?: string;
  relativePath?: string;
  where?: string;
}

export interface DataTableValues {
  resetIcons: boolean;
}

export interface DocumentViewRequestType {
  customUrl?: string;
  children?: AlfrescoChildren;
  maxItems: number;
  pageNumber: number;
  search?: AlfrescoQuery;
  sortAsc?: boolean | null;
  sortColumnIndex?: number | null;
  sortKeys?: string[] | null;
}

export interface DocumentViewType {
  id: string;
}

export type DocumentViewStateType = FetchStateType &
  Readonly<{
    items: DocumentViewType[];
    itemsCount: number;
    maxItems?: number;
    pageNumber: number;
    selected: DocumentViewType[];
    shouldRefreshTable: boolean | null;
    sortAsc?: boolean | null;
    sortColumnIndex?: number | null;
    sortColumnKey?: string | null;
    sortKeys?: string[] | null;
    source?: Folder | null;
  }>;
