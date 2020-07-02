export interface ErrorType {
  code: string | null;
  message: string | null;
}

export type ErrorTypeWithFailedIds = ErrorType & {
  ids?: string[];
};

export type FetchStateType = Readonly<{
  error: ErrorType | null;
  pending: boolean;
}>;

export interface NodeType {
  createdAt: Date;
  id: string;
  modifiedAt: Date;
  name: string;
}

export interface NodeWithPathType extends NodeType {
  path: {
    name: string;
  };
}

export interface PagingEntryResponseType<T> {
  list: {
    entries: { entry: T }[];
    pagination: {
      count: number;
      hasMoreItems: boolean;
      maxItems: number;
      skipCount: number;
      totalItems: number;
    };
  };
}

export type VoidFunction = () => void;
