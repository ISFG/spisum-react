import { useStyles } from "../../../../core/components/dialog/Dialog.styles";
import InputLabel from "@material-ui/core/InputLabel";
import { lang, t } from "../../../../translation/i18n";
import { lastPathMember, translationPath } from "../../../utils/getPath";
import { Field } from "formik";
import { Select } from "formik-material-ui";
import { sslPropsProxy } from "../../../../core/types";
import MenuItem from "@material-ui/core/MenuItem";
import { DeliveryMode } from "../../../../enums";
import React from "react";
import FormControlWithError from "../../../../core/components/formControlWithError";
import { FromControlComponent } from "../../../../core/components/formControlWithError/_types";

const deliveryModes = [
  {
    id: DeliveryMode.Currier,
    translationKey: translationPath(lang.enums.deliveryMode.currier)
  },
  {
    id: DeliveryMode.Personally,
    translationKey: translationPath(lang.enums.deliveryMode.personally)
  },
  {
    id: DeliveryMode.Post,
    translationKey: translationPath(lang.enums.deliveryMode.post)
  },
  {
    id: DeliveryMode.Email,
    translationKey: translationPath(lang.enums.deliveryMode.email)
  },
  {
    id: DeliveryMode.Databox,
    translationKey: translationPath(lang.enums.deliveryMode.databox)
  }
];

interface OwnProps {
  component?: FromControlComponent;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  enabledModes?: DeliveryMode[];
  disabledButVisibleModes?: DeliveryMode[];
  withEmptyOption?: boolean;
}

export const SSLDeliveryMode = ({
  component,
  className,
  disabled = false,
  enabledModes,
  disabledButVisibleModes,
  required = false,
  withEmptyOption = false
}: OwnProps) => {
  const classes = useStyles();

  const modes = !enabledModes
    ? deliveryModes
    : deliveryModes.filter(({ id }) => enabledModes.indexOf(id) > -1);

  const isDisabled = (id: DeliveryMode) =>
    !disabledButVisibleModes ? false : disabledButVisibleModes.indexOf(id) > -1;

  return (
    <FormControlWithError
      component={component}
      className={className}
      name={lastPathMember(sslPropsProxy.deliveryMode).path}
    >
      <InputLabel htmlFor="delivery-mode" required={required}>
        {t(translationPath(lang.general.deliveryMode))}
      </InputLabel>
      <Field
        component={Select}
        data-test-id="input-deliveryMode"
        disabled={disabled}
        name={lastPathMember(sslPropsProxy.deliveryMode).path}
        inputProps={{
          id: "delivery-mode"
        }}
        required={required}
      >
        {withEmptyOption && (
          <MenuItem className={classes.emptyMenuItem} value="" />
        )}
        {modes.map(({ id, translationKey }) => (
          <MenuItem key={id} value={id} disabled={isDisabled(id)}>
            {t(translationKey)}
          </MenuItem>
        ))}
      </Field>
    </FormControlWithError>
  );
};
