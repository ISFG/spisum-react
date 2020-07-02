import {
  Node,
  NodeChildAssociationEntry,
  SslProperties
} from "core/api/models";
import { ErrorType } from "../../../../types";
import { createSafeAsyncAction } from "../../../utils/typesafeActions";
import { PromoteConceptToDocumentRequestType } from "./_types";

export const promoteConceptToDocumentAction = createSafeAsyncAction(
  "@components/PROMOTE_CONCEPT_TO_DOCUMENT_ACTION_REQUEST",
  "@components/PROMOTE_CONCEPT_TO_DOCUMENT_ACTION_SUCCESS",
  "@components/PROMOTE_CONCEPT_TO_DOCUMENT_ACTION_ERROR"
)<
  PromoteConceptToDocumentRequestType,
  NodeChildAssociationEntry<Node<SslProperties>>,
  ErrorType
>();
