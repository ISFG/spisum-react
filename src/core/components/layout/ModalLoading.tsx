import { Modal } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { LoadingImage, LoadingLayout } from "./ModalLoading.styles";

const ModalLoading = () => {
  const loading = useSelector(
    (state: RootStateType) => state.layoutReducer.loading
  );
  return (
    <Modal disableAutoFocus={true} disableEnforceFocus={true} open={loading}>
      <LoadingLayout>
        <LoadingImage size={68} />
      </LoadingLayout>
    </Modal>
  );
};

export default ModalLoading;
