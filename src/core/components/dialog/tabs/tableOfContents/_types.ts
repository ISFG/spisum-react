import { createProxy } from "share/utils/getPath";
import { Node, SslProperties } from "../../../../api/models";
import { EntityList } from "../../../../entities";

export type TableOfContentsTableType = Node<SslProperties>;

export type TableOfContentsRequestType = {
  nodeId: string;
  skipCount?: number;
  maxItems?: number;
};

export type TableOfContentsSuccessResponseType = EntityList<
  Node<SslProperties>
>;

export type TableOfContentsStateType = TableOfContentsSuccessResponseType;

export const TableOfContentsTableTypeProxy = createProxy<
  TableOfContentsTableType
>();
