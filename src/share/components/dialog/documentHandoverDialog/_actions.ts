import { GenericDocument } from "core/types";
import { createSafeAction } from "share/utils/typesafeActions";

export const handoverDocument = createSafeAction("@document/HANDOVER")<
  GenericDocument
>();
