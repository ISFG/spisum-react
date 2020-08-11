import isEqual from "lodash/isEqual";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MetaFormProps } from "share/components/dialog/_types";
import { mapRedundantMetaFormValues } from "../../mappers/api/document";
import { useAutoSaveDocument } from "../dialog/hooks/useAutoSaveDocument";
import { useMetaFormDocument } from "../dialog/hooks/useMetaFormDocument";
import { useSyncFormValidityWithDialog } from "../dialog/hooks/useSyncFormValidityWithDialog";
import { DialogDataProps, TabAndDialogChannelType } from "../dialog/_types";
import { FormState } from "../reactiveFormik/_types";
import { metaFormAction__Clear } from "./_actions";
import { FormValues } from "./_types";

interface OwnProps<T> {
  channel: TabAndDialogChannelType;
  dialogProps: DialogDataProps;
  MetaForm: React.ComponentType<MetaFormProps<T>>;
  onClose?: VoidFunction;
}

const MetaFormContainer = <T extends FormValues>({
  channel,
  dialogProps,
  MetaForm,
  onClose
}: OwnProps<T>) => {
  const dispatch = useDispatch();
  const {
    formValues,
    isLoading,
    documentId,
    destroy,
    nodeType
  } = useMetaFormDocument();

  const setFormRef = useSyncFormValidityWithDialog<T>(channel);
  const setFormAutosaveRef = useAutoSaveDocument<T>({
    channel,
    documentId: documentId as string,
    saveOnOpen: dialogProps.saveOnOpen,
    storeFormValues: formValues as T,
    useAutoSave: dialogProps.useAutoSave
  });

  useEffect(() => {
    if (!destroy) return;
    onClose?.();
  }, [destroy]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    channel.setIsLoading(!!isLoading);
  }, [isLoading, channel]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    channel.setState({ ...channel.state, id: documentId, nodeType });
  }, [documentId, nodeType]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => () => {
      // clear on unmount
      dispatch(metaFormAction__Clear());
    },
    [dispatch]
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const checkFormUnsavedChanges = useCallback(
    (ref) => {
      if (dialogProps.isReadonly) {
        return;
      }
      if (ref?.values && formValues) {
        channel.setIsSaved(
          isEqual(
            mapRedundantMetaFormValues(ref.values),
            mapRedundantMetaFormValues(formValues)
          )
        );
        channel.setState({ ...channel.state, formValues: ref.values });
      }
    },
    [formValues] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const setReferences = (ref: FormState<T>) => {
    setFormRef(ref);
    setFormAutosaveRef(ref);
    checkFormUnsavedChanges(ref);
  };

  return !isLoading && documentId ? (
    <div className="body-fullsize">
      <MetaForm
        initialValues={(channel?.state?.formValues || formValues) as T}
        formRef={setReferences}
        readonly={!!dialogProps.isReadonly}
      />
    </div>
  ) : (
    <></>
  );
};

export default MetaFormContainer;
