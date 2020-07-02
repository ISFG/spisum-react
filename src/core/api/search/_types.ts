import { NodeChildrenSuccessResponseType } from "../node/_types";

export type SearchRequestType = {
  include?: string[];
  paging?: {
    maxItems: number;
    skipCount: number;
  };
  sort?: SearchSortType[];
  query: {
    query: string;
    language?: string;
  };
};

export type SearchSortType = {
  ascending: boolean;
  field: string;
  type: string;
};

export type FetchByCustomUrlRequestType = {
  include?: string[];
  maxItems?: number;
  orderBy?: string[];
  skipCount?: number;
  where?: string;
  customUrl: string;
};

export type SearchSuccessResponseType = NodeChildrenSuccessResponseType;
