import { ActionOnCloseType } from "core/components/dialog/_types";
import { createSafeAction } from "share/utils/typesafeActions";

export const createTechnicalDataCarriesDocument = createSafeAction(
  "@dialog/CREATE_OPEN_TECHNICAL_DATA_CARRIES_DOCUMENT"
)<{ onClose: (props: ActionOnCloseType) => void }>();
