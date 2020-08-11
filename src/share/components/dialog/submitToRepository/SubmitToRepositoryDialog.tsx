import { Box, InputLabel, MenuItem, Select } from "@material-ui/core";
import clsx from "clsx";
import { GroupMember } from "core/api/models";
import { LoadingImage } from "core/components/dataTable/Loading.styles";
import {
  StyledFormControlWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import {
  DialogContentPropsType,
  DialogDataGenericData
} from "core/components/dialog/_types";
import FormControlWithError from "core/components/formControlWithError";
import { FormState } from "core/components/reactiveFormik/_types";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  groupChangeFormValuesProxy,
  SubmitToRepositoryFormValuesType
} from "./_types";

const SubmitToDialogContent = ({
  channel,
  dialogProps
}: DialogContentPropsType) => {
  const classes = useStyles();
  const { groupList, selected } = dialogProps.data as DialogDataGenericData;
  const count = selected?.length;
  const isGroupList = groupList!.length > 1;
  useEffect(() => {
    channel.setIsSaved(true);
  }, [channel]);
  const setFormRef = useSyncFormValidityWithDialog(channel);
  const onSubmit = () => {};

  if (channel.isLoading) {
    return (
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <LoadingImage />
      </Box>
    );
  }
  return (
    <div className={classes.modalSmall}>
      {t(translationPath(lang.dialog.content.submitToRepository), { count })}
      <div
        className={
          !isGroupList
            ? classes.modalBodyInvisible
            : clsx(classes.alignBaselineField, classes.flex, classes.mtGap)
        }
      >
        <InputLabel required={true}>
          {t(translationPath(lang.general.repository))}
        </InputLabel>
        <Formik<SubmitToRepositoryFormValuesType>
          initialValues={{
            activeGroup: groupList![0].id
          }}
          innerRef={setFormRef}
          onSubmit={onSubmit}
        >
          {({
            setFieldValue,
            values
          }: FormState<SubmitToRepositoryFormValuesType>) => {
            const handleGroupChange = (
              event: React.ChangeEvent<{ value: unknown }>
            ) => {
              setFieldValue(
                lastPathMember(groupChangeFormValuesProxy.activeGroup).path,
                event.target.value
              );
            };
            return (
              <Form
                className={clsx(classes.form, classes.widthHalf, classes.mlGap)}
              >
                <FormControlWithError
                  name={
                    lastPathMember(groupChangeFormValuesProxy.activeGroup).path
                  }
                  component={StyledFormControlWide}
                >
                  <Field
                    component={Select}
                    data-test-id="group-change-form-activeGroup"
                    value={values.activeGroup}
                    onChange={handleGroupChange}
                    name={
                      lastPathMember(groupChangeFormValuesProxy.activeGroup)
                        .path
                    }
                    inputProps={{
                      id: lastPathMember(groupChangeFormValuesProxy.activeGroup)
                        .path
                    }}
                  >
                    {groupList?.map((group: GroupMember) => {
                      return (
                        <MenuItem key={group.id} value={group.id}>
                          {group.displayName}
                        </MenuItem>
                      );
                    })}
                  </Field>
                </FormControlWithError>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SubmitToDialogContent;
