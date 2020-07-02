import { Node, NodeChildAssociationEntry, SslConcept } from "core/api/models";
import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType, ErrorTypeWithFailedIds } from "types";
import { ActionType } from "typesafe-actions";
import { Concept } from "../../entities/concept/Concept";
import {
  ConceptCancelRequestType,
  ConceptRecoverRequestType,
  ConceptRevertVersionRequestType
} from "./_types";

export interface ConceptUpdateRequest {
  body: Concept;
  nodeId: Node["id"];
}

export const conceptCreateActionType = createSafeAsyncAction(
  "@concept/CREATE_ACTION_REQUEST",
  "@concept/CREATE_ACTION_SUCCESS",
  "@concept/CREATE_ACTION_FAILURE"
)<undefined, Concept, ErrorType>();

export const conceptUpdateActionType = createSafeAsyncAction(
  "@concept/UPDATE_ACTION_REQUEST",
  "@concept/UPDATE_ACTION_SUCCESS",
  "@concept/UPDATE_ACTION_FAILURE"
)<ConceptUpdateRequest, NodeChildAssociationEntry<SslConcept>, ErrorType>();

export const conceptRecoverActionType = createSafeAsyncAction(
  "@concept/RECOVER_ACTION_REQUEST",
  "@concept/RECOVER_ACTION_SUCCESS",
  "@concept/RECOVER_ACTION_FAILURE"
)<ConceptRecoverRequestType, void, ErrorTypeWithFailedIds>();

export const conceptRevertVersionActionType = createSafeAsyncAction(
  "@concept/REVERT_VERSION_ACTION_REQUEST",
  "@concept/REVERT_VERSION_ACTION_SUCCESS",
  "@concept/REVERT_VERSION_ACTION_FAILURE"
)<ConceptRevertVersionRequestType, void, ErrorType>();

export const conceptCancelActionType = createSafeAsyncAction(
  "@concept/CANCEL_ACTION_REQUEST",
  "@concept/CANCEL_ACTION_SUCCESS",
  "@concept/CANCEL_ACTION_FAILURE"
)<ConceptCancelRequestType, void, ErrorType>();

export type ConceptActionTypes = ActionType<
  | typeof conceptCreateActionType
  | typeof conceptUpdateActionType
  | typeof conceptRevertVersionActionType
  | typeof conceptCancelActionType
>;
