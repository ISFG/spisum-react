import { FormControlComponent } from "core/components/formControlWithError/_types";
import { sslPropsProxy } from "core/types";
import { DeliveryMode } from "enums";
import React from "react";
import { lang, t } from "translation/i18n";
import { lastPathMember, translationPath } from "../../../utils/getPath";
import { EnumSelect } from "../enumSelect/EnumSelect";

interface OwnProps {
  className?: string;
  component?: FormControlComponent;
  disabled?: boolean;
  required?: boolean;
  allowedModes?: DeliveryMode[];
  disabledModes?: DeliveryMode[];
  firstEmpty?: boolean;
}

export const SslDeliveryMode = ({
  className,
  component,
  disabled = false,
  allowedModes,
  disabledModes,
  required = false,
  firstEmpty = false
}: OwnProps) => {
  return (
    <EnumSelect
      className={className}
      component={component}
      enumType={DeliveryMode}
      allowedItems={allowedModes}
      disabledItems={disabledModes}
      firstEmpty={firstEmpty}
      disabled={disabled}
      translations={lang.enums.deliveryMode}
      name={lastPathMember(sslPropsProxy.deliveryMode).path}
      label={t(translationPath(lang.general.deliveryMode))}
      required={required}
    />
  );
};
