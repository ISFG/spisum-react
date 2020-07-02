import { evidenceSubmitToRepository } from "core/api/evidence/_actions";
import { GroupMember, Node, SslProperties } from "core/api/models";
import { SubmitToRepositoryDialog } from "enums";
import { ActionType } from "typesafe-actions";
import { createProxy } from "../../../utils/getPath";

export interface SubmitToRepositoryFormValuesType {
  activeGroup: string;
}

export interface SubmitToRepositoryDialogType
  extends SubmitToRepositoryActionType {
  groupList: GroupMember[];
}

export interface SubmitToRepositoryActionType {
  selected: Node<SslProperties>[];
  onSubmitActionName: SubmitToRepositoryDialog;
}
export const groupChangeFormValuesProxy = createProxy<
  SubmitToRepositoryFormValuesType
>();

export type onSubmitActionDialogType = ActionType<
  typeof evidenceSubmitToRepository
>;
