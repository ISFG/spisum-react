import {
  DialogContentPropsType,
  DialogDataProps
} from "core/components/dialog/_types";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { notificationAction } from "../../../../core/components/notifications/_actions";
import { NotificationSeverity } from "../../../../core/components/notifications/_types";
import { getService } from "../../../../core/features/dependencyInjection";
import { Signer } from "../../../../core/services/Signer";
import CancelDialog from "../cancelDialog/CancelDialog";

const PERIOD = 3000;

const successStatuses = ["OK", "BatchResultDone"];

const SignAndTimestampDialog = ({
  channel,
  dialogData,
  onClose
}: DialogContentPropsType) => {
  const signer = getService(Signer);
  const dispatch = useDispatch();
  const dialogDataTyped = dialogData as DialogDataProps;
  const timer = useRef<number>();
  const componentData = dialogDataTyped.signerComponentId;

  const handleSigningFinish = (allSigned: boolean) => {
    dispatch(
      notificationAction({
        message: allSigned
          ? t(translationPath(lang.dialog.notifications.actionSucceeded))
          : t(translationPath(lang.dialog.notifications.actionFailed)),
        severity: allSigned
          ? NotificationSeverity.Success
          : NotificationSeverity.Error
      })
    );
    onClose?.();
  };

  const fetchFilesStatuses = async () => {
    const componentsSignStatuses = await signer.getComponentsSignStatus(
      componentData
    );
    if (!componentsSignStatuses || !componentsSignStatuses.length) {
      return;
    }

    const allSigned = successStatuses.includes(
      componentsSignStatuses[0].status
    );
    handleSigningFinish(allSigned);
  };

  useEffect(() => {
    timer.current = window.setInterval(fetchFilesStatuses, PERIOD);
    return () => {
      window.clearInterval(timer.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CancelDialog
      channel={channel}
      dialogData={dialogData}
      question={t(translationPath(lang.dialog.content.signingInProgress))}
    />
  );
};

export default SignAndTimestampDialog;
