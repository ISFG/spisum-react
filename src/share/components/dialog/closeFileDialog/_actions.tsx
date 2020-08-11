import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";

export const closeFileDialogOpen = createSafeAction("@dialog/CLOSE_FILE")<
  DialogDataProps
>();
