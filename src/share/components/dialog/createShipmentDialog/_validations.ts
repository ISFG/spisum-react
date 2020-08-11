import { SendModeValues } from "enums";
import * as yup from "yup";
import { validateErrors } from "../../../utils/validation";
import { personallyFormValidationSchema } from "../shipmentDetailDialog/forms/personalFrom/_validations";
import { databoxFormValidationSchema } from "./forms/databoxForm/_validations";
import { emailFormValidationSchema } from "./forms/emailForm/_validations";
import { postFormValidationSchema } from "./forms/postForm/_validations";
import { publishFormValidationSchema } from "./forms/publishForm/_validations";
import { CreateShipmentFormValues } from "./_types";

export const validate = (values: CreateShipmentFormValues) =>
  validateErrors(validationSchema, values);

const schemas = {
  [SendModeValues.Databox]: databoxFormValidationSchema,
  [SendModeValues.Email]: emailFormValidationSchema,
  [SendModeValues.Publish]: publishFormValidationSchema,
  [SendModeValues.Personally]: personallyFormValidationSchema,
  [SendModeValues.Post]: postFormValidationSchema
};

export const validationSchema = yup.lazy<CreateShipmentFormValues>(
  (values) =>
    (schemas[values.sendMode] as unknown) as yup.Schema<
      CreateShipmentFormValues
    >
);
