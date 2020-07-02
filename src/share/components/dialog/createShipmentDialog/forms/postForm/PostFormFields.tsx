import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import {
  StyledFieldWide,
  StyledFormControl,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { PostItemType, PostType } from "enums";
import { Field, useFormikContext } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { lang, t } from "translation/i18n";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import {
  CreateShipmentFormValues,
  CreateShipmentFormValuesProxy
} from "../../_types";
import { PostPriceField } from "./PostPriceField";
import { PostTypeField } from "./PostTypeField";
interface OwnProps {
  values: CreateShipmentFormValues;
  readonly: boolean;
}

export const PostFormFields = ({ values, readonly }: OwnProps) => {
  const classes = useStyles();
  const { setFieldValue } = useFormikContext();

  const handlePostItemTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== PostItemType.other) {
      setFieldValue(
        lastPathMember(CreateShipmentFormValuesProxy.postItemTypeOther).path,
        ""
      );
    }
  };

  return (
    <>
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-address1"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.address1).path}
        type="text"
        label={t(translationPath(lang.general.addressee))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-address2"
        disabled={readonly}
        required={false}
        name={lastPathMember(CreateShipmentFormValuesProxy.address2).path}
        type="text"
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-address3"
        disabled={readonly}
        required={false}
        name={lastPathMember(CreateShipmentFormValuesProxy.address3).path}
        type="text"
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-address4"
        disabled={readonly}
        required={false}
        name={lastPathMember(CreateShipmentFormValuesProxy.address4).path}
        type="text"
      />

      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-addressStreet"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.addressStreet).path}
        type="text"
        label={t(translationPath(lang.general.addressStreet))}
      />

      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-addressCity"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.addressCity).path}
        type="text"
        label={t(translationPath(lang.general.city))}
      />

      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-addressZip"
        disabled={readonly}
        required={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.addressZip).path}
        type="text"
        label={t(translationPath(lang.general.zipCode))}
      />

      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-addressState"
        disabled={readonly}
        required={false}
        name={lastPathMember(CreateShipmentFormValuesProxy.addressState).path}
        type="text"
        label={t(translationPath(lang.general.addressState))}
      />
      <div
        className={clsx(classes.fullWidth, classes.alignItemsEnd, classes.form)}
      >
        <PostTypeField readonly={readonly} className={classes.gapRight} />

        {values?.postType?.includes(PostType.cashOnDelivery) && (
          <PostPriceField
            readonly={readonly}
            name={
              lastPathMember(
                CreateShipmentFormValuesProxy.postItemCashOnDelivery
              ).path
            }
            label={t(translationPath(lang.general.cashOnDeliveryPrice))}
          />
        )}

        {values?.postType?.includes(PostType.price) && (
          <PostPriceField
            readonly={readonly}
            name={
              lastPathMember(CreateShipmentFormValuesProxy.postItemStatedPrice)
                .path
            }
            label={t(translationPath(lang.enums.postType.price))}
          />
        )}
      </div>

      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-postTypeOther"
        disabled={!values?.postType?.includes(PostType.other)}
        required={values?.postType?.includes(PostType.other)}
        name={lastPathMember(CreateShipmentFormValuesProxy.postTypeOther).path}
        type="text"
        label={t(translationPath(lang.general.postTypeOther))}
      />

      <FormControlWithError
        component={StyledFormControl}
        name={lastPathMember(CreateShipmentFormValuesProxy.postItemType).path}
      >
        <InputLabel
          required={true}
          htmlFor={
            lastPathMember(CreateShipmentFormValuesProxy.postItemType).path
          }
        >
          {t(translationPath(lang.general.postItemType))}
        </InputLabel>
        <Field
          component={Select}
          data-test-id="create-shipment-postItemType"
          disabled={readonly}
          name={lastPathMember(CreateShipmentFormValuesProxy.postItemType).path}
          inputProps={{
            id: lastPathMember(CreateShipmentFormValuesProxy.postItemType).path,
            onChange: handlePostItemTypeChange
          }}
        >
          {PostItemType &&
            Object.keys(PostItemType)?.map((key) => (
              <MenuItem key={key} value={PostItemType[key]}>
                {t(translationPath(lang.enums.postItemType[key]))}
              </MenuItem>
            ))}
        </Field>
      </FormControlWithError>

      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-post-postItemTypeOther"
        disabled={values.postItemType !== PostItemType.other}
        required={values.postItemType === PostItemType.other}
        name={
          lastPathMember(CreateShipmentFormValuesProxy.postItemTypeOther).path
        }
        type="text"
        label={t(translationPath(lang.general.postItemTypeOther))}
      />
    </>
  );
};
