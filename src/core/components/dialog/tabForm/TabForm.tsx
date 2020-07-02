import { Formik, FormikConfig } from "formik";
import React from "react";
import { TabAndDialogChannel } from "../lib/TabAndDialogChannel";
import { useSyncFormValidityWithDialog } from "../hooks/useSyncFormValidityWithDialog";

interface OwnProps<Values> extends FormikConfig<Values> {
  channel: TabAndDialogChannel;
}

export function TabForm<Values>({ channel, ...formikProps }: OwnProps<Values>) {
  const setFormRef = useSyncFormValidityWithDialog(channel);

  return <Formik<Values> {...formikProps} innerRef={setFormRef} />;
}
