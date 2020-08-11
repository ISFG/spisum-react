import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import clsx from "clsx";
import {
  StyledField,
  StyledFieldWide,
  StyledFormControl,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormControlWithError from "core/components/formControlWithError";
import { FormState } from "core/components/reactiveFormik/_types";
import { shipmentDocumentProxy } from "core/types";
import { PostItemType, PostType } from "enums";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import React from "react";
import { withTranslation } from "react-i18next";
import { StyledMenuItem } from "share/components/dialog/createShipmentDialog/CreateShipment.styles";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { PostPriceField } from "../../../createShipmentDialog/forms/postForm/PostPriceField";
import { PostTypeField } from "../../../createShipmentDialog/forms/postForm/PostTypeField";
import { CreateShipmentFormValuesProxy } from "../../../createShipmentDialog/_types";
import { MetaFormProps } from "../../../_types";
import { ShipmentFormValues } from "../../_types";
import { BaseBottomForm, BaseUpperForm } from "../baseForm/ShipmentBaseForm";
import { validate } from "./_validations";

const Component = ({
  initialValues,
  formRef,
  readonly
}: MetaFormProps<ShipmentFormValues> & WithTranslation) => {
  const dialogClasses = useStyles();
  const handle = (): void => void 0;

  return (
    <Formik<ShipmentFormValues>
      initialValues={initialValues}
      validate={validate}
      innerRef={formRef || handle}
      onSubmit={handle}
    >
      {({ setFieldValue, values }: FormState<ShipmentFormValues>) => {
        const onPostItemWeightBlurHandler = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          const value =
            e.target.value !== "" ? Number(e.target.value).toFixed(2) : "";

          setFieldValue(
            lastPathMember(
              shipmentDocumentProxy.properties?.ssl?.postItemWeight
            ).path,
            value
          );
        };
        const onPostItemTypeChangeHandler = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          if (e.target.value !== PostItemType.other) {
            setFieldValue(
              lastPathMember(
                shipmentDocumentProxy.properties?.ssl?.postItemTypeOther
              ).path,
              ""
            );
          }
        };
        /*
        const onPostTypeChangeHandler = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          if (e.target.value !== PostItemType.other) {
            setFieldValue(
              lastPathMember(
                shipmentDocumentProxy.properties?.ssl?.postTypeOther
              ).path,
              ""
            );
          }
        };
        */
        const onPostItemPriceBlurHandler = (
          e: React.ChangeEvent<HTMLInputElement>
        ) => {
          const value =
            e.target.value !== "" ? Number(e.target.value).toFixed(2) : "";

          setFieldValue(
            lastPathMember(shipmentDocumentProxy.properties?.ssl?.postItemPrice)
              .path,
            value
          );
        };

        return (
          <Form className={dialogClasses.form}>
            <BaseUpperForm
              initialValues={initialValues}
              readonly={true}
              toDispatchDatePosition={"top"}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-address1"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(shipmentDocumentProxy.properties?.ssl?.address1)
                  .path
              }
              type="text"
              label={t(translationPath(lang.general.addressee))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-address2"
              disabled={readonly}
              name={
                lastPathMember(shipmentDocumentProxy.properties?.ssl?.address2)
                  .path
              }
              type="text"
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-address3"
              disabled={readonly}
              name={
                lastPathMember(shipmentDocumentProxy.properties?.ssl?.address3)
                  .path
              }
              type="text"
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-address4"
              disabled={readonly}
              name={
                lastPathMember(shipmentDocumentProxy.properties?.ssl?.address4)
                  .path
              }
              type="text"
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-address-street"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.addressStreet
                ).path
              }
              type="text"
              label={t(translationPath(lang.general.streetAndStreetNumber))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-address-city"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.addressCity
                ).path
              }
              type="text"
              label={t(translationPath(lang.general.municipality))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-address-zip"
              disabled={readonly}
              required={true}
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.addressZip
                ).path
              }
              type="text"
              label={t(translationPath(lang.general.zipCode))}
            />
            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-address-state"
              disabled={readonly}
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.addressState
                ).path
              }
              type="text"
              label={t(translationPath(lang.general.addressState))}
            />
            <BaseBottomForm />
            <div
              className={clsx(
                dialogClasses.fullWidth,
                dialogClasses.flex,
                dialogClasses.alignItemsEnd,
                dialogClasses.mtGap
              )}
            >
              <StyledField
                component={TextField}
                data-test-id="detail-shipment-post-state"
                className={dialogClasses.gapRight}
                disabled={true}
                name={
                  lastPathMember(shipmentDocumentProxy.properties?.ssl?.state)
                    .path
                }
                type="text"
                label={t(translationPath(lang.shipmentForm.state))}
              />
              <PostTypeField
                readonly={!!readonly}
                className={dialogClasses.gapRight}
              />
              <FormControlWithError
                component={StyledFormControl}
                name={
                  lastPathMember(
                    shipmentDocumentProxy.properties?.ssl?.postItemType
                  ).path
                }
              >
                <InputLabel
                  htmlFor={
                    lastPathMember(
                      shipmentDocumentProxy.properties?.ssl?.postItemType
                    ).path
                  }
                >
                  {t(translationPath(lang.general.postItemType))}
                </InputLabel>
                <Field
                  component={Select}
                  data-test-id="detail-shipment-post-postItemType"
                  disabled={readonly}
                  name={
                    lastPathMember(
                      shipmentDocumentProxy.properties?.ssl?.postItemType
                    ).path
                  }
                  inputProps={{
                    id: lastPathMember(
                      shipmentDocumentProxy.properties?.ssl?.postItemType
                    ).path,
                    onChange: onPostItemTypeChangeHandler
                  }}
                >
                  {PostItemType &&
                    Object.keys(PostItemType)?.map((key) => (
                      <StyledMenuItem
                        key={key}
                        value={PostItemType[key] || null}
                      >
                        {(PostItemType[key] &&
                          t(translationPath(lang.enums.postItemType[key]))) ||
                          " "}
                      </StyledMenuItem>
                    ))}
                </Field>
              </FormControlWithError>
            </div>

            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-post-postTypeOther"
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.postTypeOther
                ).path
              }
              disabled={values.postType !== PostType.other || readonly}
              required={values.postType === PostType.other}
              type="text"
              label={t(translationPath(lang.general.postTypeOther))}
            />

            <StyledFieldWide
              component={TextField}
              data-test-id="detail-shipment-post-post-postItemTypeOther"
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.postItemTypeOther
                ).path
              }
              disabled={values.postItemType !== PostType.other || readonly}
              required={values.postItemType === PostType.other}
              type="text"
              label={t(translationPath(lang.general.postItemTypeOther))}
            />
            <StyledField
              component={TextField}
              data-test-id="detail-shipment-post-post-postItemWeight"
              disabled={readonly}
              required={false}
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.postItemWeight
                ).path
              }
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>
              }}
              inputProps={{
                onBlur: onPostItemWeightBlurHandler
              }}
              type="number"
              step="0.01"
              label={t(translationPath(lang.general.weight))}
            />
            <StyledField
              component={TextField}
              data-test-id="detail-shipment-post-post-postItemPrice"
              disabled={readonly}
              required={false}
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.postItemPrice
                ).path
              }
              inputProps={{
                onBlur: onPostItemPriceBlurHandler
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">Kč</InputAdornment>
              }}
              type="number"
              step="0.01"
              label={t(translationPath(lang.general.postItemPrice))}
            />
            <StyledField
              component={TextField}
              data-test-id="detail-shipment-post-post-postItemNumber"
              disabled={readonly}
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.postItemNumber
                ).path
              }
              type="text"
              label={t(translationPath(lang.general.serialNumber))}
            />
            <StyledField
              component={TextField}
              data-test-id="detail-shipment-post-post-postItemId"
              disabled={readonly}
              name={
                lastPathMember(
                  shipmentDocumentProxy.properties?.ssl?.postItemId
                ).path
              }
              type="text"
              label={t(translationPath(lang.general.postItemId))}
            />
            <div className={dialogClasses.fullWidth}>
              {values?.postType?.includes(PostType.cashOnDelivery) && (
                <PostPriceField
                  className={dialogClasses.gapRight}
                  readonly={!!readonly}
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
                  readonly={!!readonly}
                  name={
                    lastPathMember(
                      CreateShipmentFormValuesProxy.postItemStatedPrice
                    ).path
                  }
                  label={t(translationPath(lang.enums.postType.price))}
                />
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export const ShipmentPostForm = withTranslation()(React.memo(Component));
