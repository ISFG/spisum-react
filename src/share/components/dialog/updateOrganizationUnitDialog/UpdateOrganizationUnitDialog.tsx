import { useStyles } from "core/components/dialog/Dialog.styles";
import { DialogContentType } from "core/components/dialog/_types";
import React from "react";
import { useSyncFormValidityWithDialog } from "../../../../core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { Formik } from "formik";
import { validate } from "./_validations";
import { FormState } from "../../../../core/components/reactiveFormik/_types";
import { UpdateOrganizationUnitForm } from "./UpdateOrganizationUnitForm";
import { UpdateOrganizationUnitFormValues } from "./_types";
import { GroupMember } from "../../../../core/api/models";

export const UpdateOrganizationUnitDialogContent: DialogContentType["content"] = ({
  channel,
  dialogData
}) => {
  const classes = useStyles();
  const setFormRef = useSyncFormValidityWithDialog(channel);

  const onSubmit = () => {};

  const initialValues: UpdateOrganizationUnitFormValues = {
    name: (dialogData as GroupMember)?.displayName
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
