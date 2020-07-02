import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import DataTable from "core/components/dataTable";
import { DataColumn } from "core/components/dataTable/_types";
import {
  StyledFormControl,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import {
  DialogDataProps,
  DialogDataType,
  TabAndDialogChannelType
} from "core/components/dialog/_types";
import {
  GenericDocument,
  ShipmentDocument,
  shipmentDocumentProxy
} from "core/types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Select } from "formik-material-ui";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { lang, t } from "translation/i18n";
import { SendModeValues, SpisumNodeTypes } from "../../../../enums";
import {
  classPath,
  lastPathMember,
  translationPath
} from "../../../utils/getPath";
import { useStyles as useShipmentStyles } from "./CreateShipment.styles";
import { FormFieldsBasedOnSendMode } from "./forms/formFieldsBasedOnSendMode/FormFieldsBasedOnSendMode";
import {
  CreateShipmentFormValues,
  CreateShipmentFormValuesProxy
} from "./_types";
import { validate } from "./_validations";

const convertToKB = (value: number | undefined) => {
  if (value) {
    return (value / 1024).toFixed(1);
  }
  return 0;
};

const columns: DataColumn<ShipmentDocument>[] = [
  {
    getValue: (entity) => entity?.properties?.ssl?.fileName || "",
    keys: [classPath(shipmentDocumentProxy.name).path],
    label: t(translationPath(lang.general.name))
  },
  {
    getValue: (entity) => `${convertToKB(entity.content?.sizeInBytes)} kB`,
    keys: [classPath(shipmentDocumentProxy.content?.sizeInBytes).path],
    label: t(translationPath(lang.general.size))
  }
];

const attachmentComponentBlacklist = [
  SendModeValues.Post,
  SendModeValues.Personally
];

interface OwnProps {
  channel: TabAndDialogChannelType;
  dialogData: DialogDataType;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortingChange: (
    index: number,
    keys: string[]
  ) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  readonly: boolean;
  totalItems: number;
  isLoading: boolean;
  rows: ShipmentDocument[];
}

const getComponentMaxSizeAndCount = (sendMode: string) => {
  if (sendMode === SendModeValues.Databox) {
    return {
      maxCount: Infinity,
      maxSize: 50000
    };
  } else {
    return {
      maxCount: 300,
      maxSize: 10000
    };
  }
};

export const CreateShipmentForm = React.memo(
  ({
    channel,
    dialogData,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSortingChange,
    isLoading,
    readonly,
    rows,
    totalItems
  }: OwnProps) => {
    const dialogClasses = useStyles();
    const classes = useShipmentStyles();
    const isFileType =
      (dialogData as DialogDataProps).nodeType === SpisumNodeTypes.File;
    const setFormRef = useSyncFormValidityWithDialog(channel);
    const [selectedItemsInfo, setSelectedItemsInfo] = useState({
      itemsSizeInBytes: 0,
      selectedCount: 0
    });
    const [sendMode, setSendMode] = useState(SendModeValues.Email);
    const [errors, setErrors] = useState<{
      componentsCount: boolean;
      componentsSize: boolean;
    }>({
      componentsCount: true,
      componentsSize: false
    });

    useEffect(() => {
      // 0 components is selected, disable action
      channel.setState({ ...channel.state, preventAction: !isFileType });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onSubmit = (
      values: CreateShipmentFormValues,
      { setSubmitting }: FormikHelpers<CreateShipmentFormValues>
    ) => {
      setSubmitting(false);
    };

    const setPreventAction = (
      itemsSizeInBytes: number,
      itemsCount: number
    ): void => {
      const { maxSize, maxCount } = getComponentMaxSizeAndCount(sendMode);
      const maxSizeExceeded = maxSize < (convertToKB(itemsSizeInBytes) || 0);
      const maxComponentsCountExceeded = maxCount < itemsCount;

      setErrors({
        componentsCount: maxComponentsCountExceeded || !itemsCount,
        componentsSize: maxSizeExceeded
      });

      const preventAction =
        maxSizeExceeded ||
        maxComponentsCountExceeded ||
        (!itemsCount && !attachmentComponentBlacklist.includes(sendMode));

      channel.setState({
        ...channel.state,
        preventAction
      });
    };

    const handleSelectionChange = (items: ShipmentDocument[]) => {
      const itemsSizeInBytes = items.reduce(
        (acc, item) => acc + (item.content?.sizeInBytes || 0),
        0
      );

      setPreventAction(itemsSizeInBytes, items.length);

      channel.setState({
        ...channel.state,
        selectedComponentsIds: items.map((item) => item.id)
      });
      setSelectedItemsInfo({
        itemsSizeInBytes: +itemsSizeInBytes,
        selectedCount: items.length
      });
    };

    const defaultDays = 15;

    return (
      <Formik<CreateShipmentFormValues>
        initialValues={{
          address1: "",
          address2: "",
          address3: "",
          address4: "",
          addressCity: "",
          addressState: "",
          addressStreet: "",
          addressZip: "",
          allowSubstDelivery: false,
          dateFrom: moment().toDate(),
          dateTo: moment().add(defaultDays, "d").toDate(),
          days: defaultDays,
          legalTitleLaw: "",
          legalTitlePar: "",
          legalTitlePoint: "",
          legalTitleSect: "",
          legalTitleYear: "",
          note: "",
          personalDelivery: false,
          postItemCashOnDelivery: 0,
          postItemStatedPrice: 0,
          postItemType: "",
          postItemTypeOther: "",
          postItemWeight: "",
          postType: [],
          postTypeOther: "",
          recipient: "",
          sendMode: isFileType ? SendModeValues.Post : SendModeValues.Email,
          sender: "",
          subject: "",
          toHands: ""
        }}
        onSubmit={onSubmit}
        innerRef={setFormRef}
        validate={validate}
      >
        {({ setFieldValue, values }) => {
          const showAttachmentsComponent = !attachmentComponentBlacklist.includes(
            values.sendMode
          );
          const handleSendModeChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const value = e.target.value as SendModeValues;
            const sslSubject =
              (dialogData as GenericDocument)?.properties?.ssl?.subject || "";
            setFieldValue("sendMode", value);
            setFieldValue(
              "subject",
              value === SendModeValues.Databox ? sslSubject : ""
            );
            setSendMode(value);

            if (attachmentComponentBlacklist.includes(value)) {
              channel.setState({
                ...channel.state,
                preventAction: false
              });
            }
          };

          return (
            <Form className={dialogClasses.form}>
              <StyledFormControl>
                <InputLabel
                  htmlFor={
                    lastPathMember(CreateShipmentFormValuesProxy.sendMode).path
                  }
                >
                  {t(translationPath(lang.general.sendMode))}
                </InputLabel>
                <Field
                  required={true}
                  component={Select}
                  data-test-id="create-shipment-sendMode"
                  name={
                    lastPathMember(CreateShipmentFormValuesProxy.sendMode).path
                  }
                  inputProps={{
                    id: lastPathMember(CreateShipmentFormValuesProxy.sendMode)
                      .path,
                    onChange: handleSendModeChange
                  }}
                >
                  <MenuItem value={SendModeValues.Email} disabled={isFileType}>
                    {t(translationPath(lang.enums.deliveryMode.email))}
                  </MenuItem>
                  <MenuItem
                    value={SendModeValues.Databox}
                    disabled={isFileType}
                  >
                    {t(translationPath(lang.enums.deliveryMode.databox))}
                  </MenuItem>
                  <MenuItem value={SendModeValues.Personally}>
                    {t(translationPath(lang.enums.deliveryMode.personally))}
                  </MenuItem>
                  <MenuItem value={SendModeValues.Post}>
                    {t(translationPath(lang.enums.deliveryMode.post))}
                  </MenuItem>
                  <MenuItem
                    value={SendModeValues.Publish}
                    disabled={isFileType}
                  >
                    {t(translationPath(lang.enums.deliveryMode.publish))}
                  </MenuItem>
                </Field>
              </StyledFormControl>
              <FormFieldsBasedOnSendMode
                readonly={readonly}
                sendModeValue={values.sendMode}
                values={values}
              />
              <div
                className={clsx({
                  [dialogClasses.modalBodyInvisible]: !showAttachmentsComponent,
                  [dialogClasses.fullWidth]: true
                })}
              >
                <DataTable
                  breadcrumbs={[]}
                  columns={columns}
                  defaultActionFirst={true}
                  handleChangePage={handleChangePage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  handleSelectionChange={handleSelectionChange}
                  handleSortingChange={handleSortingChange}
                  pageNumber={0}
                  paginationClassName={dialogClasses.tablePaginationDisabled}
                  pending={isLoading}
                  rows={rows}
                  rowsCount={totalItems}
                  rowsPerPage={100}
                  tableLayoutClassName="dialog__table-layout--shipment"
                  tableWrapperClassName={classes.dialogShipmentTable}
                />
                <div
                  className={clsx(dialogClasses.fullWidth, classes.tableInfo)}
                >
                  <span
                    className={clsx(
                      dialogClasses.mrGap,
                      {
                        [classes.tableInfoItemError]: errors.componentsCount
                      },
                      classes.tableInfoCountItem
                    )}
                  >
                    {t(translationPath(lang.general.attachmentsCount))}
                    {": "}
                    {selectedItemsInfo.selectedCount}
                  </span>
                  <span
                    className={clsx(
                      {
                        [classes.tableInfoItemError]: errors.componentsSize
                      },
                      classes.tableInfoSizeItem
                    )}
                  >
                    {t(translationPath(lang.general.totalSize))}
                    {": "}
                    {convertToKB(selectedItemsInfo.itemsSizeInBytes)} kB
                  </span>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  }
);
