import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import { EmailAccount } from "core/api/email/_types";
import {
  StyledFieldWide,
  StyledFormControlThird,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { Field } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { lang, t } from "translation/i18n";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { CreateShipmentFormValuesProxy } from "../../_types";

interface OwnProps {
  readonly: boolean;
}

export const EmailFormFields = ({ readonly }: OwnProps) => {
  const classes = useStyles();
  const emailAccounts = useSelector(
    (state: RootStateType) => state.emailReducer.emailAccounts
  );

  return (
    <>
      <FormControlWithError
        className={clsx(classes.gapRightBig)}
        component={StyledFormControlThird}
        name={lastPathMember(CreateShipmentFormValuesProxy.sender).path}
      >
        <InputLabel
          required={true}
          htmlFor={lastPathMember(CreateShipmentFormValuesProxy.sender).path}
        >
          {t(translationPath(lang.general.sendFromEmail))}
        </InputLabel>
        <Field
          component={Select}
          data-test-id="create-shipment-email-sender"
          disabled={readonly}
          name={lastPathMember(CreateShipmentFormValuesProxy.sender).path}
          inputProps={{
            id: lastPathMember(CreateShipmentFormValuesProxy.sender).path
          }}
        >
          {emailAccounts?.map((account: EmailAccount, index: number) => {
            return (
              <MenuItem key={index} value={account.username}>
                {account.username} - {account.name}
              </MenuItem>
            );
          })}
        </Field>
      </FormControlWithError>
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-email"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.recipient).path}
        type="text"
        label={t(translationPath(lang.general.email))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-subject"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.subject).path}
        type="text"
        label={t(translationPath(lang.general.subject))}
      />
    </>
  );
};
