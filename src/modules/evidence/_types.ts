import { GenericDocument } from "core/types";
import { SpisumNodeTypes } from "enums";

export enum ChangeDocumentIsFavoriteActionType {
  Add = "add",
  Remove = "remove"
}

export type ChangeDocumentIsFavoriteRequestType = {
  items: GenericDocument[];
  nodeType: SpisumNodeTypes;
  actionType: ChangeDocumentIsFavoriteActionType;
};
