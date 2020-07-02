import { FormState } from "core/components/reactiveFormik/_types";

export interface MetaFormProps<T> {
  formRef?: (formState: FormState<T>) => void;
  initialValues: T;
  onChange?: (formState: FormState<T>) => void;
  readonly?: boolean;
}
