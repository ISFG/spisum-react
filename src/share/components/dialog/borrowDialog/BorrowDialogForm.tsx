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
import { BorrowFormValues, BorrowFormValuesProxy } from "./_types";

export const BorrowDialogForm = React.memo(
  ({ values }: FormState<BorrowFormValues>) => {
    const classes = useStyles();
    const groups = useSelector(
      (state: RootStateType) => state.loginReducer?.global?.groups?.main
    );
    const { entities: groupMembers, loading } = useGroupMembers(values.group);
    const nextGroup = !!values?.group;

    const getGroupMembersOptionLabel = (option: GroupMember) =>
      option.displayName;

    const filterGroupMembersOptions = (
      opts: AutocompleteOptionsType,
      state: FilterOptionsState<PossibleAutocompleteOptions>
    ) => {
      const { inputValue } = state;

      if (!inputValue || inputValue.length < 2) {
        return opts;
      }

      return opts.filter((opt) =>
        opt.displayName.toLowerCase().includes(inputValue.toLocaleLowerCase())
      );
    };

    return (
      <Form className={classes.form}>
        <FormControlWithError
          component={StyledFormControlHalf}
          name={lastPathMember(BorrowFormValuesProxy.group).path}
        >
          <InputLabel
            htmlFor={lastPathMember(BorrowFormValuesProxy.group).path}
            required={true}
          >
            {t(translationPath(lang.dialog.handover.organizationlUnit))}
          </InputLabel>
          <Field
            component={Select}
            data-test-id="borrow-form-group"
            name={lastPathMember(BorrowFormValuesProxy.group).path}
            inputProps={{
              id: lastPathMember(BorrowFormValuesProxy.group).path
            }}
          >
            {groups.map((group) => (
              <MenuItem key={group.id} value={group.id}>
                {group.displayName}
              </MenuItem>
            ))}
          </Field>
        </FormControlWithError>

        {groupMembers && (
          <Field
            autocompleteComponent={StyledAutocompleteHalf}
            component={FormikAutocomplete}
            disabled={!nextGroup}
            disableOnLoad={true}
            filterOptions={filterGroupMembersOptions}
            getOptionLabel={getGroupMembersOptionLabel}
            label={t(translationPath(lang.dialog.handover.worker))}
            loading={loading}
            name={lastPathMember(BorrowFormValuesProxy.user).path}
            options={groupMembers}
            optionValueProperty="id"
            required={true}
          />
        )}
      </Form>
    );
  }
);
