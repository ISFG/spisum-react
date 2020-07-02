import { FormikHelpers } from "formik";
import { Dispatch } from "redux";
import { loginAction, LoginActionType } from "./_actions";
import { LoginFormValuesType } from "./_types";

export const submitLogin = (dispatch: Dispatch<LoginActionType>) => (
  values: LoginFormValuesType,
  { setSubmitting }: FormikHelpers<LoginFormValuesType>
) => {
  dispatch(loginAction.request(values));
  setSubmitting(false);
};
