import { FormikComputedProps, FormikHelpers, FormikState } from "formik";

export type FormState<Values> = FormikComputedProps<Values> &
  FormikState<Values> &
  FormikHelpers<Values>;
