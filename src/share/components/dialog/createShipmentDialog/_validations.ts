import * as yup from "yup";
import { SendModeValues } from "../../../../enums";
import { validateErrors } from "../../../utils/validation";
import { databoxFormValidationSchema } from "./forms/databoxForm/_validations";
import { emailFormValidationSchema } from "./forms/emailForm/_validations";
import { postFormValidationSchema } from "./forms/postForm/_validations";
import { publishFormValidationSchema } from "./forms/publishForm/_validations";
import { CreateShipmentFormValues } from "./_types";
import { personallyFormValidationSchema } from "../shipmentDetailDialog/forms/personalFrom/_validations";

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
  (values) => schemas[values.sendMode] as yup.Schema<CreateShipmentFormValues>
);
