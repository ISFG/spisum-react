import { DocumentViewType } from "core/components/documentView/_types";
import { createSafeAction } from "share/utils/typesafeActions";

export const closeFileDialogOpen = createSafeAction("@dialog/CLOSE_FILE")<
  DocumentViewType
>();
