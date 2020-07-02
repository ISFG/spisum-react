import { StyledFieldWide } from "core/components/dialog/Dialog.styles";
import { TextField } from "formik-material-ui";
import React from "react";
import { lang, t } from "translation/i18n";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { CreateShipmentFormValuesProxy } from "../../_types";

interface OwnProps {
  readonly: boolean;
}

export const PersonallyFormFields = ({ readonly }: OwnProps) => {
  return (
    <>
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-address1"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.address1).path}
        type="text"
        label={t(translationPath(lang.general.addressee))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-address2"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.address2).path}
        type="text"
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-address3"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.address3).path}
        type="text"
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-address4"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.address4).path}
        type="text"
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-address-street"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.addressStreet).path}
        type="text"
        label={t(translationPath(lang.general.streetAndStreetNumber))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-address-city"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.addressCity).path}
        type="text"
        label={t(translationPath(lang.general.municipality))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-address-zip"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.addressZip).path}
        type="text"
        label={t(translationPath(lang.general.zipCode))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-address-state"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.addressState).path}
        type="text"
        label={t(translationPath(lang.general.addressState))}
      />
    </>
  );
};
