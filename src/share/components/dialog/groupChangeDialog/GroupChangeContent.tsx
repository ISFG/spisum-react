import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  StyledFormControlWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentPropsType } from "core/components/dialog/_types";
import FormControlWithError from "core/components/formControlWithError";
import { Field, Form, Formik } from "formik";
import { Select } from "formik-material-ui";
import React from "react";
import { useSelector } from "react-redux";
import { lang, t } from "translation/i18n";
import { RootStateType } from "../../../../reducers";
import { lastPathMember, translationPath } from "../../../utils/getPath";
import {
  ActiveGroupType,
  groupChangeFormValuesProxy,
  GroupChangeFormValuesType
} from "./_types";
import { validate } from "./_validations";

export const GroupChangeContent = ({ channel }: DialogContentPropsType) => {
  const classes = useStyles();
  const { groups, activeGroup } = useSelector(
    (state: RootStateType) => state?.loginReducer?.session
  );
  const filteredGroups = groups.filter((grp) => grp.id !== activeGroup);
  const setFormRef = useSyncFormValidityWithDialog(channel);
  const onSubmit = () => {};

  return (
    <div className={classes.modalSmall}>
      <Formik<GroupChangeFormValuesType>
        initialValues={{
          activeGroup: ""
        }}
        validate={validate}
        innerRef={setFormRef}
        onSubmit={onSubmit}
      >
        <Form className={classes.form}>
          <FormControlWithError
            name={lastPathMember(groupChangeFormValuesProxy.activeGroup).path}
            component={StyledFormControlWide}
          >
            <InputLabel
              htmlFor={
                lastPathMember(groupChangeFormValuesProxy.activeGroup).path
              }
              required={true}
            >
              {t(translationPath(lang.general.group))}
            </InputLabel>
            <Field
              component={Select}
              data-test-id="group-change-form-activeGroup"
              name={lastPathMember(groupChangeFormValuesProxy.activeGroup).path}
              inputProps={{
                id: lastPathMember(groupChangeFormValuesProxy.activeGroup).path
              }}
            >
              {filteredGroups.map((group: ActiveGroupType) => {
                return (
                  <MenuItem key={group.id} value={group.id}>
                    {group.displayName}
                  </MenuItem>
                );
              })}
            </Field>
          </FormControlWithError>
        </Form>
      </Formik>
    </div>
  );
};
