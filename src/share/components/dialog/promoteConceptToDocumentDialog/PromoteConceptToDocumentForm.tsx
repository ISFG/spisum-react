import clsx from "clsx";
import { GroupMember, Person } from "core/api/models";
import { ApiURL } from "core/apiURL";
import Datepicker from "core/components/datepicker/Component";
import {
  StyledAutocomplete,
  StyledField,
  StyledFieldWide,
  useStyles
} from "core/components/dialog/Dialog.styles";
import FormikAutocomplete from "core/components/formikAutocomplete/Component";
import { FormState } from "core/components/reactiveFormik/_types";
import { fetchSuggestions } from "core/helpers/api/AutocompleteFetcher";
import { Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { lastPathMember, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import {
  PromoteConceptToDocumentFormValues,
  PromoteConceptToDocumentFormValuesProxy
} from "./_types";
const MIN_TERM_LENGTH = 2;
const DEBOUNCE_TIME = 500;

export const PromoteConceptToDocumentForm = React.memo(
  ({
    values,
    setFieldValue
  }: FormState<PromoteConceptToDocumentFormValues>) => {
    const dialogClasses = useStyles();

    const [autocompleteLoading, setAutocompleteLoading] = useState<boolean>(
      false
    );
    const [autocompleteOptions, setAutocompleteOptions] = useState<Person[]>(
      []
    );
    const getGroupMembersOptionLabel = (option: GroupMember) => {
      return option.displayName;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getAutocompleteOptions = useCallback(
      debounce(async (term: string) => {
        setAutocompleteLoading(true);
        const entities = await fetchSuggestions<Person>({
          term,
          url: ApiURL.QUERIES_PEOPLE
        });
        setAutocompleteOptions(entities);
        setAutocompleteLoading(false);
      }, DEBOUNCE_TIME),
      []
    );

    const handleOnInputChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const term = e.target.value;
      if (term && term.length >= MIN_TERM_LENGTH) {
        getAutocompleteOptions(term);
      }
    };

    return (
      <Form className={dialogClasses.form}>
        <p className={clsx(dialogClasses.fullWidth, dialogClasses.textCenter)}>
          {t(translationPath(lang.dialog.content.conceptToDocument))}
        </p>
        <StyledFieldWide
          component={TextField}
          data-test-id="promote-concept-to-doc-subject"
          name={
            lastPathMember(PromoteConceptToDocumentFormValuesProxy.subject).path
          }
          required={true}
          multiline={true}
          rows={1}
          rowsMax={Infinity}
          type="text"
          label={t(translationPath(lang.general.subject))}
        />
        <StyledField
          className={dialogClasses.fieldErrorPositioned}
          component={TextField}
          data-test-id="promote-concept-to-doc-subject-attachmentsCount"
          name={
            lastPathMember(
              PromoteConceptToDocumentFormValuesProxy.attachmentsCount
            ).path
          }
          required={true}
          type="number"
          label={t(translationPath(lang.general.attachmentsCount))}
        />
        <Field
          autocompleteComponent={StyledAutocomplete}
          component={FormikAutocomplete}
          getOptionLabel={getGroupMembersOptionLabel}
          label={t(translationPath(lang.general.documentAuthor))}
          loading={autocompleteLoading}
          name={
            lastPathMember(PromoteConceptToDocumentFormValuesProxy.author).path
          }
          required={true}
          options={autocompleteOptions}
          optionValueProperty="id"
          onInputChange={handleOnInputChange}
        />
        <Datepicker
          data-test-id="promote-concept-to-doc-subject-settleTo"
          disablePast={true}
          name={
            lastPathMember(PromoteConceptToDocumentFormValuesProxy.settleTo)
              .path
          }
          label={t(translationPath(lang.documentMetaForm.settleDate))}
        />
      </Form>
    );
  }
);
