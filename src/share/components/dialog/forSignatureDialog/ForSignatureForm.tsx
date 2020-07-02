import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { FilterOptionsState } from "@material-ui/lab";
import { GroupMember } from "core/api/models";
import {
  StyledAutocompleteHalf,
  StyledFormControlHalf,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import FormikAutocomplete from "core/components/formikAutocomplete/Component";
import {
  AutocompleteOptionsType,
  PossibleAutocompleteOptions
} from "core/components/formikAutocomplete/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { useGroupMembers } from "core/hooks/useGroupMembers";
import { Field, Form } from "formik";
import { Select } from "formik-material-ui";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ForSignatureFormValues, forSignatureFormValuesProxy } from "./_types";

export const ForSignatureForm = React.memo(
  ({ values }: FormState<ForSignatureFormValues>) => {
    const classes = useStyles();
    const groups = useSelector(
      (state: RootStateType) => state.loginReducer?.global?.groups?.main
    );

    const groupNameWithSuffix = values.group ? `${values.group}_Sign` : "";

    const { entities: groupMembers, loading } = useGroupMembers(
      groupNameWithSuffix
    );
    const isGroup = !!values?.group;

    const getGroupMembersOptionLabel = (option: GroupMember) => {
      return option.displayName;
    };

    const filterGroupMembersOptions = (
      opts: AutocompleteOptionsType,
      state: FilterOptionsState<PossibleAutocompleteOptions>
    ) => {
      const { inputValue } = state;
      if (!inputValue || inputValue.length < 2) return opts;
      return opts.filter((opt) =>
        opt.displayName.toLowerCase().includes(inputValue.toLocaleLowerCase())
      );
    };

    return (
      <Form className={classes.form}>
        <FormControlWithError
          name={lastPathMember(forSignatureFormValuesProxy.group).path}
          component={StyledFormControlHalf}
        >
          <InputLabel
            htmlFor={lastPathMember(forSignatureFormValuesProxy.group).path}
            required={true}
          >
            {t(translationPath(lang.dialog.handover.organizationlUnit))}
          </InputLabel>
          <Field
            component={Select}
            data-test-id="document-handover-form-nextGroup"
            name={lastPathMember(forSignatureFormValuesProxy.group).path}
            inputProps={{
              id: lastPathMember(forSignatureFormValuesProxy.group).path
            }}
          >
            {groups.map((grp) => (
              <MenuItem key={grp.id} value={grp.id}>
                {grp.displayName}
              </MenuItem>
            ))}
          </Field>
        </FormControlWithError>

        {groupMembers && (
          <Field
            autocompleteComponent={StyledAutocompleteHalf}
            component={FormikAutocomplete}
            disabled={!isGroup}
            disableOnLoad={true}
            getOptionLabel={getGroupMembersOptionLabel}
            label={t(translationPath(lang.dialog.handover.worker))}
            loading={loading}
            name={lastPathMember(forSignatureFormValuesProxy.user).path}
            required={true}
            options={groupMembers}
            optionValueProperty="id"
            filterOptions={filterGroupMembersOptions}
          />
        )}
      </Form>
    );
  }
);
