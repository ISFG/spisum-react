import { SaveDocumentActionType } from "core/api/document/_types";
import { ActionOnCloseType } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";

export const createAnalogDocument = createSafeAction(
  "@document/CREATE_OPEN_ANALOG_DOCUMENT"
)<{ onClose?: (props: ActionOnCloseType) => void }>();

export const saveDocumentAction = createSafeAction("@document/SAVE_DOCUMENT")<
  SaveDocumentActionType
>();
