import { GroupMember } from "core/api/models";
import { DialogContentType } from "core/components/dialog/_types";
import { Group } from "core/entities";
import { createProxy } from "share/utils/getPath";

export interface DocumentHandoverDialogContentType {
  documentHandoverDialogContent: DialogContentType;
}

export type DocumentHandoverFormValues = {
  nextGroup?: Group["id"];
  nextOwner?: GroupMember["id"];
};

export const documentHandoverFormValuesProxy = createProxy<
  DocumentHandoverFormValues
>();
