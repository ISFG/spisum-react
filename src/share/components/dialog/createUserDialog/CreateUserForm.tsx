import { Chip } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import {
  StyledField,
  StyledFieldThird,
  StyledFormControl,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Select, TextField } from "formik-material-ui";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { createUserDefaultFormValues } from "../../../../core/api/user/_sagas";
import FormControlWithError from "../../../../core/components/formControlWithError";
import { MetaFormProps } from "../../../../core/components/MetaForm/_types";
import { lang, t, WithTranslation } from "../../../../translation/i18n";
import { lastPathMember, translationPath } from "../../../utils/getPath";
import { UserFormValuesProxy, UserFormValuesType } from "./_types";
import { getValidationMethod } from "./_validations";

export const CreateUserForm = ({
  initialValues,
  formRef
}: MetaFormProps<UserFormValuesType> & WithTranslation) => {
  const classes = useStyles();
  const [isUserEdit, setIsUserEdit] = useState<boolean>(false);
  const groups = initialValues?.availableGroups || [];

  const onSubmit = (
    values: UserFormValuesType,
    { setSubmitting }: FormikHelpers<UserFormValuesType>
  ) => {
    setSubmitting(false);
  };

  const renderMultipleChips = (selected: string[]) => (
    <div>
      {(selected as string[]).map((value) => {
        const group = groups.find((grp) => grp.id === value);
        return (
          <Chip key={value} style={{ margin: 2 }} label={group?.displayName} />
        );
      })}
    </div>
  );

  useEffect(() => {
    setIsUserEdit(!!initialValues.id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classes.modalBodyFullSize}>
      <div className="body-fullsize">
        <Formik<UserFormValuesType>
          initialValues={initialValues || createUserDefaultFormValues}
          validate={getValidationMethod(isUserEdit)}
          innerRef={formRef}
          onSubmit={onSubmit}
        >
          {({ values }) => {
            return (
              <Form className={classes.form}>
                <StyledField
                  component={TextField}
                  data-test-id="create-user-id"
                  name={lastPathMember(UserFormValuesProxy.id).path}
                  disabled={isUserEdit}
                  required={true}
                  type="text"
                  label={t(translationPath(lang.general.id))}
                />
                <StyledField
                  component={TextField}
                  data-test-id="create-user-firstName"
                  name={lastPathMember(UserFormValuesProxy.firstName).path}
                  required={true}
                  type="text"
                  label={t(translationPath(lang.general.firstName))}
                />
                <StyledField
                  component={TextField}
                  data-test-id="create-user-lastName"
                  name={lastPathMember(UserFormValuesProxy.lastName).path}
                  type="text"
                  label={t(translationPath(lang.general.lastName))}
                />
                <StyledField
                  component={TextField}
                  data-test-id="create-user-email"
                  name={lastPathMember(UserFormValuesProxy.email).path}
                  required={true}
                  type="text"
                  label={t(translationPath(lang.general.email))}
                />

                <div
                  className={clsx(
                    classes.fullWidth,
                    classes.alignItemsEnd,
                    classes.form
                  )}
                >
                  <StyledField
                    component={TextField}
                    data-test-id="create-user-password"
                    name={lastPathMember(UserFormValuesProxy.password).path}
                    required={!isUserEdit}
                    type="password"
                    label={t(translationPath(lang.login.password))}
                  />
                  <StyledField
                    component={TextField}
                    data-test-id="create-user-passwordAgain"
                    name={
                      lastPathMember(UserFormValuesProxy.passwordAgain).path
                    }
                    required={!isUserEdit}
                    type="password"
                    label={t(translationPath(lang.general.passwordAgain))}
                  />
                  <FormControlWithError
                    name={lastPathMember(UserFormValuesProxy.groups).path}
                    component={StyledFormControl}
                  >
                    <InputLabel
                      htmlFor={lastPathMember(UserFormValuesProxy.groups).path}
                    >
                      {t(
                        translationPath(lang.dialog.handover.organizationlUnit)
                      )}
                    </InputLabel>
                    <Field
                      className={classes.multiSelectAutoGrow}
                      component={Select}
                      data-test-id="create-user-groups"
                      name={lastPathMember(UserFormValuesProxy.groups).path}
                      inputProps={{
                        id: lastPathMember(UserFormValuesProxy.groups).path
                      }}
                      multiple={true}
                      renderValue={renderMultipleChips}
                    >
                      {groups.map(({ id, displayName }) => (
                        <MenuItem
                          className={classes.selectedItem}
                          key={id}
                          value={id}
                        >
                          {displayName}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControlWithError>
                  <FormControlWithError
                    name={lastPathMember(UserFormValuesProxy.mainGroup).path}
                    component={StyledFormControl}
                  >
                    <InputLabel
                      htmlFor={
                        lastPathMember(UserFormValuesProxy.mainGroup).path
                      }
                      classes={{
                        root: values.mainGroup
                          ? ""
                          : "MuiFormLabel-root--long-text"
                      }}
                      style={{ maxWidth: values.mainGroup ? "initial" : 175 }}
                      required={true}
                    >
                      {t(translationPath(lang.general.mainOrganizationalUnit))}
                    </InputLabel>
                    <Field
                      component={Select}
                      data-test-id="create-user-mainGroup"
                      name={lastPathMember(UserFormValuesProxy.mainGroup).path}
                      inputProps={{
                        id: lastPathMember(UserFormValuesProxy.mainGroup).path
                      }}
                    >
                      {groups.map(({ id, displayName }) => (
                        <MenuItem key={id} value={id}>
                          {displayName}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControlWithError>
                </div>
                <div className={classes.fullWidth}>
                  <FormControlWithError
                    name={lastPathMember(UserFormValuesProxy.signGroups).path}
                    component={StyledFormControl}
                  >
                    <InputLabel
                      htmlFor={
                        lastPathMember(UserFormValuesProxy.signGroups).path
                      }
                      classes={{
                        root: values?.signGroups?.length
                          ? ""
                          : "MuiFormLabel-root--long-text"
                      }}
                      style={{
                        maxWidth: values?.signGroups?.length ? "initial" : 160
                      }}
                    >
                      {t(translationPath(lang.general.signInOrgGroup))}
                    </InputLabel>
                    <Field
                      className={classes.multiSelectAutoGrow}
                      component={Select}
                      data-test-id="create-user-signGroups"
                      name={lastPathMember(UserFormValuesProxy.signGroups).path}
                      inputProps={{
                        id: lastPathMember(UserFormValuesProxy.signGroups).path
                      }}
                      multiple={true}
                      renderValue={renderMultipleChips}
                      disabled={!groups.length}
                    >
                      {groups.map(({ id, displayName }) => (
                        <MenuItem
                          className={classes.selectedItem}
                          key={id}
                          value={id}
                        >
                          {displayName}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControlWithError>
                </div>
                <StyledFieldThird
                  component={TextField}
                  data-test-id="create-user-userId"
                  name={lastPathMember(UserFormValuesProxy.userId).path}
                  type="text"
                  label={t(translationPath(lang.general.userId))}
                />
                <StyledFieldThird
                  component={TextField}
                  data-test-id="create-user-userOrgId"
                  name={lastPathMember(UserFormValuesProxy.userOrgId).path}
                  type="text"
                  label={t(translationPath(lang.general.userOrgId))}
                />
                <StyledFieldThird
                  component={TextField}
                  data-test-id="create-user-userOrgName"
                  name={lastPathMember(UserFormValuesProxy.userOrgName).path}
                  type="text"
                  label={t(translationPath(lang.general.orgName))}
                />

                <StyledFieldThird
                  component={TextField}
                  data-test-id="create-user-userOrgUnit"
                  name={lastPathMember(UserFormValuesProxy.userOrgUnit).path}
                  type="text"
                  label={t(translationPath(lang.general.orgUnit))}
                />
                <StyledFieldThird
                  component={TextField}
                  data-test-id="create-user-userJob"
                  name={lastPathMember(UserFormValuesProxy.userJob).path}
                  type="text"
                  label={t(translationPath(lang.general.senderJob))}
                />
                <StyledFieldThird
                  component={TextField}
                  data-test-id="create-user-userOrgAddress"
                  name={lastPathMember(UserFormValuesProxy.userOrgAddress).path}
                  type="text"
                  label={t(translationPath(lang.general.orgAddress))}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export const CreateUserMetadataForm = withTranslation()(
  React.memo(CreateUserForm)
);
