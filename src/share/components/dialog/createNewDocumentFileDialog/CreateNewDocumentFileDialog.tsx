import { useSyncFormValidityWithDialog } from "core/components/dialog/hooks/useSyncFormValidityWithDialog";
import { DialogContentPropsType } from "core/components/dialog/_types";
import { FormState } from "core/components/reactiveFormik/_types";
import { GenericDocument } from "core/types";
import { SitePaths, SpisumNodeTypes } from "enums";
import { Formik } from "formik";
import { debounce } from "lodash";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { alfrescoQuery, getQueryPath } from "share/utils/query";
import { CreateNewDocumentFileForm } from "./CreateNewDocumentFileForm";
import {
  clearResultsAction,
  searchFilesAction,
  SearchFilesActionType
} from "./_actions";
import { CreateNewDocumentFileFormValues, FileOption } from "./_types";

const DEBOUNCE_WAIT = 500;
const MIN_TERM_LENGTH = 3;
const MAX_ITEMS = 25;

export const CreateNewDocumentFileDialogContent = ({
  channel,
  dialogData
}: DialogContentPropsType) => {
  const setFormRef = useSyncFormValidityWithDialog(channel);
  const dispatch = useDispatch<React.Dispatch<SearchFilesActionType>>();

  const { results, isLoading } = useSelector(
    (state: RootStateType) => state.searchFilesReducer
  );

  const pathFilesOpen = useSelector(
    (state: RootStateType) =>
      getQueryPath(
        state.loginReducer.global.paths,
        "*",
        SitePaths.Evidence,
        SitePaths.Files,
        SitePaths.Open
      )?.path || ""
  );

  const getSearchQuery = (term: string) => ({
    query: alfrescoQuery({
      paths: [pathFilesOpen],
      type: [SpisumNodeTypes.File],
      where: `(ssl:pid:'*${term}*' OR ssl:fileIdentificator:'*${term}*' OR ssl:subject:'*${term}*')`
    })
  });

  const onInputChange = debounce((value: string) => {
    if (value.length >= MIN_TERM_LENGTH) {
      dispatch(
        searchFilesAction.request({
          include: ["properties"],
          paging: {
            maxItems: MAX_ITEMS,
            skipCount: 0
          },
          query: getSearchQuery(value)
        })
      );
    }
  }, DEBOUNCE_WAIT);

  useEffect(() => {
    dispatch(clearResultsAction());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = () => {};

  return (
    <Formik<CreateNewDocumentFileFormValues>
      initialValues={{
        selected: FileOption.Existing
      }}
      innerRef={setFormRef}
      onSubmit={onSubmit}
    >
      {(props: FormState<CreateNewDocumentFileFormValues>) => (
        <CreateNewDocumentFileForm
          {...props}
          document={dialogData as GenericDocument}
          isLoading={isLoading}
          onFileSearchChange={onInputChange}
          searchResults={results || []}
        />
      )}
    </Formik>
  );
};
