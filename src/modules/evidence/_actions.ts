import { createSafeAction } from "share/utils/typesafeActions";
import { ChangeDocumentIsFavoriteRequestType } from "./_types";

export const changeDocumentIsFavoriteAction = createSafeAction(
  "@evidence/CHANGE_DOCUMENT_IS_FAVORITE"
)<ChangeDocumentIsFavoriteRequestType>();
