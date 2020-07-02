import { createSafeAction } from "share/utils/typesafeActions";
import { ActionType } from "typesafe-actions";
import { documentCreateActionType } from "../../api/document/_actions";
import { DocumentStateType } from "./_types";

export const metaFormAction__Update = createSafeAction("@metaForm/UPDATE")<
  DocumentStateType
>();

export const metaFormAction__Clear = createSafeAction("@metaForm/CLEAR")();

export const metaFormAction__Destroy = createSafeAction("@metaForm/DESTROY")();

export type MetaFormActionType = ActionType<
  | typeof metaFormAction__Update
  | typeof metaFormAction__Clear
  | typeof metaFormAction__Destroy
  | typeof documentCreateActionType
>;
