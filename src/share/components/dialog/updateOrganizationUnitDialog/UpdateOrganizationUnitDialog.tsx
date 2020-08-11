import { GroupMember } from "core/api/models";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { Formik } from "formik";
import React from "react";
import { UpdateOrganizationUnitForm } from "./UpdateOrganizationUnitForm";
import { UpdateOrganizationUnitFormValues } from "./_types";
import { validate } from "./_validations";

export const UpdateOrganizationUnitDialogContent: DialogContentType["content"] = ({
  channel,
  dialogProps
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);
  const onSubmit = () => {};

  const initialValues: UpdateOrganizationUnitFormValues = {
    name: (dialogProps.data as GroupMember)?.displayName
  };

  return (
    <div className={classes.modalBodyFullSize}>
      <div className="body-midsize">
        <Formik<UpdateOrganizationUnitFormValues>
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={setFormRef}
          validate={validate}
        >
          {(props: FormState<UpdateOrganizationUnitFormValues>) => (
            <UpdateOrganizationUnitForm {...props} />
          )}
        </Formik>
      </div>
    </div>
  );
};
