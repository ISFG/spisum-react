import { SendModeValues } from "enums";
import React, { useMemo } from "react";
import { CreateShipmentFormValues } from "../../_types";
import { DataboxFormFields } from "../databoxForm/DataboxFormFields";
import { EmailFormFields } from "../emailForm/EmailFormFields";
import { PersonallyFormFields } from "../personallyForm/PersonallyFormFields";
import { PostFormFields } from "../postForm/PostFormFields";
import { PublishFormFields } from "../publishForm/PublishFormFields";

const forms = {
  [SendModeValues.Databox]: DataboxFormFields,
  [SendModeValues.Email]: EmailFormFields,
  [SendModeValues.Post]: PostFormFields,
  [SendModeValues.Personally]: PersonallyFormFields,
  [SendModeValues.Publish]: PublishFormFields
};

interface OwnProps {
  sendModeValue: string;
  readonly: boolean;
  values: CreateShipmentFormValues;
}

export const FormFieldsBasedOnSendMode = React.memo(
  ({ sendModeValue, ...props }: OwnProps) => {
    const FormFields = useMemo(() => forms[sendModeValue], [sendModeValue]);

    return <FormFields {...props} />;
  }
);
