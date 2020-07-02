import { InputLabel, MenuItem } from "@material-ui/core";
import {
  StyledFormControlFifth,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { Field } from "formik";
import { Select } from "formik-material-ui";
import React from "react";
import { sslPropsProxy } from "../../../../core/types";
import { DocumentState } from "../../../../enums";
import { lang, t } from "../../../../translation/i18n";
import { lastPathMember, translationPath } from "../../../utils/getPath";

export const SSLStateField = () => {
  const classes = useStyles();

  return (
    <FormControlWithError
      component={StyledFormControlFifth}
      name={lastPathMember(sslPropsProxy.state).path}
    >
      <InputLabel htmlFor="state">
        {t(translationPath(lang.general.documentState))}
      </InputLabel>
      <Field
        component={Select}
        data-test-id="meta-input-state"
        disabled={true}
        name={lastPathMember(sslPropsProxy.state).path}
        inputProps={{
          id: "state"
        }}
      >
        <MenuItem className={classes.emptyMenuItem} value="" />
        <MenuItem value={DocumentState.NotSettled}>
          {t(translationPath(lang.enums.documentState.notSettled))}
        </MenuItem>
        <MenuItem value={DocumentState.Settled}>
          {t(translationPath(lang.enums.documentState.settled))}
        </MenuItem>
        <MenuItem value={DocumentState.Closed}>
          {t(translationPath(lang.enums.documentState.closed))}
        </MenuItem>
        <MenuItem value={DocumentState.ReferedToRepository}>
          {t(translationPath(lang.enums.documentState.referedToRepository))}
        </MenuItem>
        <MenuItem value={DocumentState.ReferedToArchive}>
          {t(translationPath(lang.enums.documentState.referedToArchive))}
        </MenuItem>
        <MenuItem value={DocumentState.Cancelled}>
          {t(translationPath(lang.enums.documentState.cancelled))}
        </MenuItem>
        <MenuItem value={DocumentState.Shredded}>
          {t(translationPath(lang.enums.documentState.shredded))}
        </MenuItem>
      </Field>
    </FormControlWithError>
  );
};
