import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";

export const settleDocumentDialogOpen = createSafeAction(
  "@dialog/SETTLE_DOCUMENT"
)<DialogDataProps>();
