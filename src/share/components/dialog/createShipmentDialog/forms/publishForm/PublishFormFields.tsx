import Datepicker from "core/components/datepicker/Component";
import {
  StyledField,
  StyledFieldWide
} from "core/components/dialog/Dialog.styles";
import { useFormikContext } from "formik";
import { TextField } from "formik-material-ui";
import moment from "moment";
import React, { useEffect } from "react";
import { lang, t } from "translation/i18n";
import { lastPathMember, translationPath } from "../../../../../utils/getPath";
import {
  CreateShipmentFormValues,
  CreateShipmentFormValuesProxy
} from "../../_types";

interface OwnProps {
  readonly: boolean;
  values: CreateShipmentFormValues;
}

export const PublishFormFields = ({ readonly, values }: OwnProps) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (values.days) {
      setFieldValue(
        "dateTo",
        moment(values.dateFrom.valueOf()).add(values.days, "d").toDate()
      );
    } else {
      setFieldValue("dateTo", null);
    }
  }, [values.dateFrom, values.days]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Datepicker
        data-test-id="create-shipment-publish-dateFrom"
        disabled={readonly}
        disablePast={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.dateFrom).path}
        label={t(translationPath(lang.general.dateFrom))}
        required={true}
      />
      <Datepicker
        data-test-id="create-shipment-publish-dateTo"
        disabled={true}
        name={lastPathMember(CreateShipmentFormValuesProxy.dateTo).path}
        label={t(translationPath(lang.general.dateTo))}
      />
      <StyledField
        component={TextField}
        data-test-id="create-shipment-publish-days"
        disabled={readonly}
        required={false}
        name={lastPathMember(CreateShipmentFormValuesProxy.days).path}
        type="number"
        min="1"
        label={t(translationPath(lang.general.daysCount))}
      />
      <StyledFieldWide
        component={TextField}
        data-test-id="create-shipment-publish-note"
        disabled={readonly}
        required={false}
        name={lastPathMember(CreateShipmentFormValuesProxy.note).path}
        type="text"
        label={t(translationPath(lang.general.note))}
      />
    </>
  );
};
