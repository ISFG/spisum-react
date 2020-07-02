import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentType } from "core/components/dialog/_types";
import React from "react";
import { useSyncFormValidityWithDialog } from "../../../../core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { Formik } from "formik";
import { validate } from "./_validations";
import { FormState } from "../../../../core/components/reactiveFormik/_types";
import { CreateOrganizationUnitForm } from "./CreateOrganizationUnitForm";
import { CreateOrganizationUnitFormValues } from "./_types";

export const CreateOrganizationUnitDialogContent: DialogContentType["content"] = ({
  channel,
  dialogData
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
