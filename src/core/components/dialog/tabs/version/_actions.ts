import { NodeVersionActionType } from "core/api/node/_actions";
import { ActionType } from "typesafe-actions";
import { dialogAction__Clear } from "../../_actions";

export type VersionTabActionTypes =
  | NodeVersionActionType
  | ActionType<typeof dialogAction__Clear>;
