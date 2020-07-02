import { DialogContentPropsType, DialogDataProps } from "../_types";
import { useMetaFormDocument } from "./useMetaFormDocument";

export const useDocumentId = (props: DialogContentPropsType) => {
  const dialogData = props.dialogData as DialogDataProps;
  const metaFormDocument = useMetaFormDocument();

  return (
    dialogData?.id || dialogData?.documentId || metaFormDocument.documentId
  );
};
