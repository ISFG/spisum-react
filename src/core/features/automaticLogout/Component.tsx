import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import Dialog from "./Dialog";
import { automaticLogoutDialogCloseAction } from "./_actions";

let initialRender = true;

const Component = () => {
  const dispatch = useDispatch();
  const logoutInterval = useSelector(
    (state: RootStateType) =>
      state.automaticLogoutDialogReducer.logoutInterval || 0
  );

  React.useEffect(() => {
    if (initialRender) {
      dispatch(automaticLogoutDialogCloseAction());
    }
    return () => {
      initialRender = false;
    };
  });

  return (logoutInterval > 0 && <Dialog timeout={logoutInterval} />) || null;
};

export default Component;
