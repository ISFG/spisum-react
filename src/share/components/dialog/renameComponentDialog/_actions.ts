import { File } from "core/entities";
import { createSafeAction } from "share/utils/typesafeActions";

export const renameComponentAction = createSafeAction(
  "@mailroom/dialog/component/RENAME"
)<File>();
