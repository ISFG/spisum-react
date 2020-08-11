import { DialogContentPropsType } from "core/components/dialog/_types";
import { notificationAction } from "core/components/notifications/_actions";
import { NotificationSeverity } from "core/components/notifications/_types";
import { signer } from "core/helpers/api/Signer";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import CancelDialog from "../cancelDialog/CancelDialog";

const PERIOD = 3000;

const successStatuses = ["OK", "BatchResultDone"];

const SignAndTimestampDialog = ({
  channel,
  dialogProps,
  onClose
}: DialogContentPropsType) => {
  const dispatch = useDispatch();
  const timer = useRef<number>();

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
    if (!dialogProps.signerComponentId) {
      return;
    }

    const componentsSignStatuses = await signer.getComponentsSignStatus(
      dialogProps.signerComponentId
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
      dialogProps={dialogProps}
      question={t(translationPath(lang.dialog.content.signingInProgress))}
    />
  );
};

export default SignAndTimestampDialog;
