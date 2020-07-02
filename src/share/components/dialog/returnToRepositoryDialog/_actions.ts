import { ErrorType } from "../../../../types";
import { createSafeAsyncAction } from "../../../utils/typesafeActions";
import { ReturnToRepositoryRequestType } from "./_types";

export const returnToRepositoryActionType = createSafeAsyncAction(
  "@document/RETURN_TO_REPOSITORY_ACTION_REQUEST",
  "@document/RETURN_TO_REPOSITORY_SUCCESS",
  "@document/RETURN_TO_REPOSITORY_FAILURE"
)<ReturnToRepositoryRequestType, void, ErrorType>();
