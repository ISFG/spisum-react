import { DialogDataProps } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";

export const handoverDocument = createSafeAction("@document/HANDOVER")<
  DialogDataProps
>();
