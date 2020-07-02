import { documentUpdateActionType } from "core/api/document/_actions";
import { NodeChildAssociationEntry, SslProperties } from "core/api/models";
import { documentViewAction__UpdateItem } from "core/components/documentView/_actions";
import { isEqual } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { callAsyncAction } from "../../../action";
import { metaFormAction__Update } from "../../MetaForm/_actions";
import { NotificationSeverity } from "../../notifications/_types";
import { FormState } from "../../reactiveFormik/_types";
import { TabAndDialogChannelType } from "../_types";

export interface AutoSaveHookParams<T> {
  saveOnOpen?: boolean;
  useAutoSave?: boolean;
  channel: TabAndDialogChannelType;
  storeFormValues: T;
  documentId: string;
}

export function useAutoSaveDocument<T>({
  saveOnOpen = false,
  useAutoSave = false,
  channel,
  storeFormValues,
  documentId
}: AutoSaveHookParams<T>) {
  const PERIOD = 5000;
  const dispatch = useDispatch();
  const timer = useRef<number>();
  const formRef = useRef<FormState<T>>();
  const preventUpdate = useRef<boolean>(false);

  const clearAndSetTimer = () => {
    window.clearInterval(timer.current);
    timer.current = window.setInterval(handleAutoSave, PERIOD);
  };

  const handleAutoSave = useCallback(() => {
    const { isFirstAutosave } = formRef.current?.status || {};

    if (isFirstAutosave === true) {
      formRef.current?.setStatus({
        ...formRef.current?.status,
        isFirstAutosave: false
      });

      if (!saveOnOpen) {
        return;
      }
    }

    const formikFormValues = formRef.current?.values;
    const formValuesEqual = isEqual(storeFormValues, formikFormValues);

    if (
      isFirstAutosave ||
      (!formValuesEqual &&
        !channel.isSaving &&
        !channel.state?.unsavedChangesDialogOpen)
    ) {
      const onSuccess = (
        response: NodeChildAssociationEntry<SslProperties>
      ) => {
        dispatch(
          metaFormAction__Update({
            documentId,
            formValues: formikFormValues
          })
        );
        channel.setIsSaved(true);

        if (!channel.state?.autosaved) {
          channel.setState({ ...channel.state, autosaved: true });
        }

        dispatch(documentViewAction__UpdateItem(response));
      };
      dispatch(
        callAsyncAction({
          action: documentUpdateActionType,
          onErrorNotification: {
            message: t(
              translationPath(lang.dialog.notifications.autosaveFailed)
            ),
            severity: NotificationSeverity.Error
          },
          onSuccess,
          onSuccessNotification: {
            message: t(
              translationPath(lang.dialog.notifications.autosaveSucceeded)
            ),
            severity: NotificationSeverity.Success
          },
          payload: {
            body: {
              properties: (formRef?.current?.values as unknown) as SslProperties
            },
            nodeId: documentId
          }
        })
      );
    }
  }, [formRef, documentId, storeFormValues, preventUpdate, channel]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      preventUpdate.current = true;
      window.clearInterval(timer.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (form: FormState<T>) => {
    if (!useAutoSave || preventUpdate.current) {
      return;
    }
    // clear timer always when user is typing
    clearAndSetTimer();
    formRef.current = form as FormState<T>;

    const status = formRef.current?.status;

    if (!status || status.isFirstAutosave === undefined) {
      formRef.current?.setStatus({ ...status, isFirstAutosave: true });
      if (formRef.current) {
        window.setImmediate(() => handleAutoSave());
      }
    }
  };
}
