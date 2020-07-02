import { Node, SslProperties } from "core/api/models";

export interface TakeOutFromFileDialogDataType {
  selected: Node<SslProperties>[];
  id: string;
}
