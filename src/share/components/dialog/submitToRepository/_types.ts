import { evidenceSubmitToRepository } from "core/api/evidence/_actions";
import { ActionType } from "typesafe-actions";
import { createProxy } from "../../../utils/getPath";

export interface SubmitToRepositoryFormValuesType {
  activeGroup: string;
}

export const groupChangeFormValuesProxy = createProxy<
  SubmitToRepositoryFormValuesType
>();

export type onSubmitActionDialogType = ActionType<
  typeof evidenceSubmitToRepository
>;
