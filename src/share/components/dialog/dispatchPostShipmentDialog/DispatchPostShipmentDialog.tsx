import clsx from "clsx";
import {
  StyledFieldThird,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentPropsType } from "core/components/dialog/_types";
import { shipmentDocumentProxy } from "core/types";
import { Form, Formik, FormikHelpers } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect } from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { DispatchPostShipmentFormValues } from "./_types";

const DispatchPostShipmentDialog = ({ channel }: DialogContentPropsType) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);

  const onSubmit = (
    values: DispatchPostShipmentFormValues,
    { setSubmitting }: FormikHelpers<DispatchPostShipmentFormValues>
  ) => {
    setSubmitting(false);
  };

  return (
    <Formik<DispatchPostShipmentFormValues>
      initialValues={{
        postItemId: "",
        postItemNumber: ""
      }}
      onSubmit={onSubmit}
      innerRef={setFormRef}
    >
      <Form className={classes.form} style={{ width: 500 }}>
        <StyledFieldThird
          className={clsx(classes.gapRight, classes.mlGap)}
          component={TextField}
          name={
            lastPathMember(shipmentDocumentProxy.properties?.ssl?.postItemId)
              .path
          }
          required={false}
          type="text"
          label={t(translationPath(lang.general.postItemId))}
        />
        <StyledFieldThird
          className={classes.mrGap}
          component={TextField}
          name={
            lastPathMember(
              shipmentDocumentProxy.properties?.ssl?.postItemNumber
            ).path
          }
          required={false}
          type="text"
          label={t(translationPath(lang.general.postItemNumber))}
        />
      </Form>
    </Formik>
  );
};

export default DispatchPostShipmentDialog;
