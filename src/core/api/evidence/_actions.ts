import { GenericDocument } from "core/types";
import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorTypeWithFailedIds } from "types";
import { EvidenceSubmitToRepositoryRequestType } from "./_types";

export const evidenceSubmitToRepository = createSafeAsyncAction(
  "@evidence/SUBMIT_TO_REPOSITORY_ACTION_REQUEST",
  "@evidence/SUBMIT_TO_REPOSITORY_ACTION_SUCCESS",
  "@evidence/SUBMIT_TO_REPOSITORY_ACTION_FAILURE"
)<
  EvidenceSubmitToRepositoryRequestType,
  GenericDocument,
  ErrorTypeWithFailedIds
>();
