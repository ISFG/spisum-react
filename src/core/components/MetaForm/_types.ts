import { SslAnalogWithOwner, SslDatabox, SslEmail } from "core/api/models";
import { FormState } from "core/components/reactiveFormik/_types";
import { SpisumNodeTypes } from "enums";
import { ComponentType } from "react";
import { DocumentHandoverFormValues } from "share/components/dialog/documentHandoverDialog/_types";
import { DontRegisterDocumentFormValues } from "share/components/dialog/dontRegisterDocument/_types";
import { GroupChangeFormValuesType } from "share/components/dialog/groupChangeDialog/_types";
import { ShipmentFormValues } from "share/components/dialog/shipmentDetailDialog/_types";
import { SubmitToRepositoryFormValuesType } from "share/components/dialog/submitToRepository/_types";
import { UserFormValuesType } from "../../../share/components/dialog/createUserDialog/_types";
import { Concept } from "../../entities/concept/Concept";

// Add possible FormValues
export type FormValues =
  | SslAnalogWithOwner
  | SslEmail
  | SslDatabox
  | DontRegisterDocumentFormValues
  | DocumentHandoverFormValues
  | GroupChangeFormValuesType
  | ShipmentFormValues
  | SubmitToRepositoryFormValuesType
  | Concept
  | UserFormValuesType
  | undefined;

export type MetaFormState<T> = FormState<T> | undefined;

export type SetFormType<T> = (form: FormState<T>) => void;

export type MetaFormChildComponentType<T> = ComponentType<{
  initialValues: T;
  onChange?: (formValues: MetaFormState<T>) => void;
}>;

export type DocumentStateType = {
  documentId?: string;
  nodeType?: SpisumNodeTypes;
  formValues?: FormValues;
  isLoading?: boolean;
  isLocked?: boolean;
  destroy?: boolean;
};

export type MetaFormStateType = {
  actual: DocumentStateType;
  previous: DocumentStateType[];
};

export interface MetaFormProps<T> {
  formRef?: (formState: FormState<T>) => void;
  initialValues: T;
  onChange?: (formState: FormState<T>) => void;
  readonly?: boolean;
}
