import { useEffect, useRef } from "react";
import { FormState } from "../../reactiveFormik/_types";
import { TabAndDialogChannelType } from "../_types";

export function useSyncFormValidityWithDialog<FormValuesType>(
  channel: TabAndDialogChannelType
) {
  const formRef = useRef<FormState<FormValuesType>>();

  useEffect(() => {
    // register the triggerValidationFn (for usage after any action is clicked)
    channel.registerTriggerValidationClb(() => {
      if (!formRef.current) {
        channel.setIsValid(true);
        return Promise.resolve();
      }

      return formRef.current
        ?.submitForm()
        .then(() => {
          channel.setIsValid(!!formRef.current?.isValid);

          // autosync form values
          if (formRef.current?.isValid) {
            channel.setState({
              ...channel.state,
              formValues: formRef.current.values
            });
          }
        })
        .catch(() => {
          channel.setIsValid(false);
        });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (form: FormState<FormValuesType>) => {
    formRef.current = form;
  };
}
