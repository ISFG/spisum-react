import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { DataboxAccount } from "core/api/databox/_types";
import {
  StyledField,
  StyledFieldFifth,
  StyledFieldThird,
  StyledFieldWide,
  StyledFormControlThird,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { Field } from "formik";
import { CheckboxWithLabel, Select, TextField } from "formik-material-ui";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { lang, t } from "translation/i18n";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { CreateShipmentFormValuesProxy } from "../../_types";

interface OwnProps {
  readonly: boolean;
}

export const DataboxFormFields = ({ readonly }: OwnProps) => {
  const dialogClasses = useStyles();
  const databoxAccounts = useSelector(
    (state: RootStateType) => state.databoxReducer.databoxAccounts
  );

  return (
    <>
      <StyledFieldThird
        component={TextField}
        data-test-id="create-shipment-databox-recipient"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.recipient).path}
        type="text"
        label={t(translationPath(lang.general.recipientDataboxId))}
      />
      <FormControlWithError
        name={lastPathMember(CreateShipmentFormValuesProxy.sender).path}
        component={StyledFormControlThird}
      >
        <InputLabel
          required={true}
          htmlFor={lastPathMember(CreateShipmentFormValuesProxy.sender).path}
        >
          {t(translationPath(lang.general.sendFromDatabox))}
        </InputLabel>
        <Field
          component={Select}
          data-test-id="create-shipment-databox-sender"
          disabled={readonly}
          name={lastPathMember(CreateShipmentFormValuesProxy.sender).path}
          inputProps={{
            id: lastPathMember(CreateShipmentFormValuesProxy.sender).path
          }}
        >
          {databoxAccounts?.map((account: DataboxAccount, index: number) => {
            return (
              <MenuItem key={index} value={account.id}>
                {account.id} - {account.name}
              </MenuItem>
            );
          })}
        </Field>
      </FormControlWithError>
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-databox-subject"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.subject).path}
        type="text"
        label={t(translationPath(lang.general.subject))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-databox-toHands"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.toHands).path}
        type="text"
        label={t(translationPath(lang.general.toHands))}
      />
      <h2 className={dialogClasses.fullWidth}>
        {t(translationPath(lang.general.empowerment))}
      </h2>
      <StyledFieldFifth
        component={TextField}
        data-test-id="create-shipment-databox-legalTitleLaw"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.legalTitleLaw).path}
        type="number"
        label={t(translationPath(lang.general.lawNumber))}
      />
      <StyledFieldFifth
        component={TextField}
        data-test-id="create-shipment-databox-legalTitleYear"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.legalTitleYear).path}
        type="number"
        label={t(translationPath(lang.general.year))}
      />
      <StyledFieldFifth
        component={TextField}
        data-test-id="create-shipment-databox-legalTitleYear"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.legalTitleSect).path}
        type="text"
        label="§"
      />
      <StyledFieldFifth
        component={TextField}
        data-test-id="create-shipment-databox-legalTitlePar"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.legalTitlePar).path}
        type="number"
        label={t(translationPath(lang.general.paragraph))}
      />
      <StyledFieldFifth
        component={TextField}
        data-test-id="create-shipment-databox-legalTitlePoint"
        disabled={readonly}
        name={
          lastPathMember(CreateShipmentFormValuesProxy.legalTitlePoint).path
        }
        type="text"
        label={t(translationPath(lang.general.letter))}
      />
      <StyledField
        component={CheckboxWithLabel}
        data-test-id="create-shipment-databox-personalDelivery"
        disabled={readonly}
        name={
          lastPathMember(CreateShipmentFormValuesProxy.allowSubstDelivery).path
        }
        type="checkbox"
        Label={{
          className: dialogClasses.styledCheckboxFull,
          label: t(translationPath(lang.general.forbidFictionDelivery))
        }}
      />
      <StyledField
        component={CheckboxWithLabel}
        data-test-id="create-shipment-databox-personalDelivery"
        disabled={readonly}
        name={
          lastPathMember(CreateShipmentFormValuesProxy.personalDelivery).path
        }
        type="checkbox"
        Label={{
          className: dialogClasses.styledCheckbox,
          label: t(translationPath(lang.general.toOwnHands))
        }}
      />
    </>
  );
};
