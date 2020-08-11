import { Restore } from "@material-ui/icons";
import { callAsyncAction } from "core/action";
import { conceptRevertVersionActionType } from "core/api/concept/_actions";
import { documentRevertVersionActionType } from "core/api/document/_actions";
import { NodeVersion } from "core/api/models";
import { nodeVersionAction } from "core/api/node/_actions";
import { ControlsBarType } from "core/components/dataTable/_types";
import { SpisumNodeTypes } from "enums";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { DialogTabContentPropsType } from "../../_types";
import VersionTab from "./VersionTab";

type VersionTabContainerProps = DialogTabContentPropsType & {
  nodeId: string;
};

interface VersionTabContainerState {
  pageNumber: number;
  rowsPerPage: number;
}

const initialState: VersionTabContainerState = {
  pageNumber: 0,
  rowsPerPage: 50
};

const VersionTabContainer = ({
  channel,
  dialogProps,
  isActive,
  nodeId
}: VersionTabContainerProps) => {
  const [{ pageNumber, rowsPerPage }, setState] = useState<
    VersionTabContainerState
  >(initialState);

  const { entries, totalItems, isLoading, error } = useSelector(
    (state: RootStateType) => {
      return {
        entries: state.versionReducer.list.entries?.map((e) => e.entry),
        error: state.versionReducer.error,
        isLoading: state.versionReducer.isLoading,
        totalItems: state.versionReducer.list.pagination?.totalItems || 0
      };
    }
  );

  const dispatch = useDispatch();
  const loadData = useCallback(
    () =>
      dispatch(
        nodeVersionAction.request({
          maxItems: rowsPerPage,
          nodeId,
          skipCount: pageNumber * rowsPerPage
        })
      ),
    [pageNumber, rowsPerPage] // eslint-disable-line react-hooks/exhaustive-deps
  );

  channel.refreshData = loadData;

  useEffect(() => {
    if (isActive && entries === undefined) {
      loadData();
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isActive) {
      loadData();
    }
  }, [pageNumber, rowsPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void = (_, page) => {
    setState((state) => ({
      pageNumber: page,
      rowsPerPage: state.rowsPerPage
    }));
  };

  const handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    setState(() => ({
      pageNumber: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  };

  const onSuccess = () => {
    loadData();
  };

  const reverActionsPerNodeType = {
    [SpisumNodeTypes.Document]: documentRevertVersionActionType,
    [SpisumNodeTypes.Concept]: conceptRevertVersionActionType
  };

  const controls: ControlsBarType<NodeVersion> = {};

  if (!dialogProps.isReadonly) {
    controls.single = {
      items: [
        {
          action: (selected: NodeVersion[]) => {
            const action = reverActionsPerNodeType[selected[0].nodeType];

            if (!action) {
              return;
            }

            dispatch(
              callAsyncAction({
                action,
                onSuccess,
                payload: {
                  nodeId,
                  versionId: selected[0].id
                }
              })
            );
          },
          filter: (x) => (entries ? entries[0] !== x : false),
          icon: <Restore />,
          title: t(translationPath(lang.general.revertVersion))
        }
      ]
    };
  }

  if (error) {
    return <div />;
  }

  return (
    <VersionTab
      controls={controls}
      items={entries || []}
      totalItems={totalItems}
      pageNumber={pageNumber}
      refreshTable={loadData}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      isLoading={isLoading}
    />
  );
};

export default VersionTabContainer;
