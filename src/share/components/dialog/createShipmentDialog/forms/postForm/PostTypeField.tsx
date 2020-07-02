import { Chip } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Field, useFormikContext } from "formik";
import { Select } from "formik-material-ui";
import React from "react";
import {
  StyledFormControl,
  useStyles
} from "../../../../../../core/components/dialog/Dialog.styles";
import FormControlWithError from "../../../../../../core/components/formControlWithError";
import { PostType, PostTypeLangMap } from "../../../../../../enums";
import { lang, t } from "../../../../../../translation/i18n";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import { CreateShipmentFormValuesProxy } from "../../_types";

interface OwnProps {
  readonly: boolean;
  className?: string;
}

export const PostTypeField = ({ readonly, className = "" }: OwnProps) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const renderMultipleChips = (selected: string[]) => (
    <div>
      {(selected as string[]).map((value) => (
        <Chip
          key={value}
          style={{ margin: 2 }}
          label={t(
            translationPath(lang.enums.postType[PostTypeLangMap[value]])
          )}
        />
      ))}
    </div>
  );

  const handlePostTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== PostType.other) {
      setFieldValue(
        lastPathMember(CreateShipmentFormValuesProxy.postTypeOther).path,
        ""
      );
    }
  };

  return (
    <FormControlWithError
      className={className}
      component={StyledFormControl}
      name={lastPathMember(CreateShipmentFormValuesProxy.postType).path}
    >
      <InputLabel
        required={true}
        htmlFor={lastPathMember(CreateShipmentFormValuesProxy.postType).path}
      >
        {t(translationPath(lang.general.postType))}
      </InputLabel>
      <Field
        className={classes.multiSelectAutoGrow}
        component={Select}
        data-test-id="create-shipment-postType"
        disabled={readonly}
        name={lastPathMember(CreateShipmentFormValuesProxy.postType).path}
        multiple={true}
        inputProps={{
          id: lastPathMember(CreateShipmentFormValuesProxy.postType).path,
          onChange: handlePostTypeChange
        }}
        renderValue={renderMultipleChips}
      >
        {PostType &&
          Object.keys(PostType)?.map((key) => (
            <MenuItem
              className={classes.selectedItem}
              key={key}
              value={PostType[key]}
            >
              {t(translationPath(lang.enums.postType[key]))}
            </MenuItem>
          ))}
      </Field>
    </FormControlWithError>
  );
};
