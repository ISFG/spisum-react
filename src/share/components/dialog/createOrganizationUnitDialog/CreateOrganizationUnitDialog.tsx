import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik } from "formik";
import React from "react";
import { CreateOrganizationUnitForm } from "./CreateOrganizationUnitForm";
import { CreateOrganizationUnitFormValues } from "./_types";
import { validate } from "./_validations";

export const CreateOrganizationUnitDialogContent: DialogContentType["content"] = ({
  channel,
  dialogProps
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  const initialValues: CreateOrganizationUnitFormValues = {
    id: "",
    name: "",
    type: ""
  };

  return (
    <div className={classes.modalBodyFullSize}>
      <div className="body-midsize">
        <Formik<CreateOrganizationUnitFormValues>
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={setFormRef}
          validate={validate}
        >
          {(props: FormState<CreateOrganizationUnitFormValues>) => (
            <CreateOrganizationUnitForm {...props} />
          )}
        </Formik>
      </div>
    </div>
  );
};
