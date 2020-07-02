import { DocumentViewType } from "core/components/documentView/_types";
import { createSafeAction } from "share/utils/typesafeActions";
import { DialogDataType } from "../../../../core/components/dialog/_types";

export const settleDocumentDialogOpen = createSafeAction(
  "@dialog/SETTLE_DOCUMENT"
)<DocumentViewType | DialogDataType>();
