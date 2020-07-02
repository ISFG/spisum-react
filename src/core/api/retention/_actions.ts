import { createSafeAsyncAction } from "share/utils/typesafeActions";
import { ErrorType } from "../../../types";
import { CreateRetentionProposalRequestType } from "./_types";

export const createRetentionProposalAction = createSafeAsyncAction(
  "@retention/CREATE_RETENTION_PROPOSAL_ACTIONS_REQUEST",
  "@retention/CREATE_RETENTION_PROPOSAL_ACTIONS_SUCCESS",
  "@components/CREATE_RETENTION_PROPOSAL_ACTIONS_FAILURE"
)<CreateRetentionProposalRequestType, void, ErrorType>();
