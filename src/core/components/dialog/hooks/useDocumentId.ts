import { DialogContentPropsType, DialogDataGenericData } from "../_types";
import { useMetaFormDocument } from "./useMetaFormDocument";

export const useDocumentId = (props: DialogContentPropsType) => {
  const data = props.dialogProps.data as DialogDataGenericData;
  const metaFormDocument = useMetaFormDocument();

  return data?.id || data?.documentId || metaFormDocument.documentId;
};
