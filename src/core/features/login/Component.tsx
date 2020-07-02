import { GlobalLayout } from "core/components/layout/GlobalLayout";
import {
  Ie11FixerChild,
  Ie11FixerParent,
  Login,
  LoginCardWide,
  LoginContent
} from "core/features/login/Component.styles";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { Dispatch } from "redux";
import { secretDecrypt } from "share/utils/byteOperations";
import { withTranslation } from "translation/i18n";
import renderForm from "./Component.form";
import { validate } from "./Component.form.validations";
import { submitLogin } from "./Component.methods";
import { LoginActionType, loginAction__ClearError } from "./_actions";
import { LoginFormValuesType } from "./_types";

let initialRender = true;

const Component = () => {
  const dispatch = useDispatch<Dispatch<LoginActionType>>();
  const {
    error,
    pending,
    session: { remember }
  } = useSelector((state: RootStateType) => state.loginReducer);

  React.useEffect(() => {
    if (initialRender) {
      dispatch(loginAction__ClearError());
      initialRender = false;
    }

    return () => {
      initialRender = true;
    };
  }, [dispatch]);

  return (
    <GlobalLayout>
      <Login>
        <LoginContent>
          <Ie11FixerParent>
            <Ie11FixerChild>
              <LoginCardWide>
                <Formik<LoginFormValuesType>
                  initialValues={{
                    password:
                      (remember && secretDecrypt(remember.password)) || "",
                    remember: remember !== null,
                    username:
                      (remember && secretDecrypt(remember.username)) || ""
                  }}
                  onSubmit={submitLogin(dispatch)}
                  validate={validate}
                >
                  {renderForm({ error, pending })}
                </Formik>
              </LoginCardWide>
            </Ie11FixerChild>
          </Ie11FixerParent>
        </LoginContent>
      </Login>
    </GlobalLayout>
  );
};

export default withTranslation()(Component);
