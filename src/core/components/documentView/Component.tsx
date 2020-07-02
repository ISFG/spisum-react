import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { Dispatch } from "redux";
import { formatDate } from "share/utils/convert";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import DataTable from "../dataTable/Component";
import { ControlsBarType, DataColumn } from "../dataTable/_types";
import {
  documentViewAction,
  documentViewAction__Clear,
  documentViewAction__Refresh,
  documentViewAction__SetSelected,
  DocumentViewActionType
} from "./_actions";
import { tryToGetLastReadDate } from "./_methods";
import {
  AlfrescoChildren,
  AlfrescoQuery,
  DataTableValues,
  DocumentViewType
} from "./_types";

export interface OwnProps<T> {
  children?: AlfrescoChildren;
  columns: DataColumn<T>[];
  controls?: ControlsBarType<T>;
  customTitle?: string;
  defaultSortAsc?: boolean;
  defaultSortColumn?: DataColumn<T>;
  isRowDisabled?: (row: T) => boolean;
  refreshPending?: boolean;
  handleDoubleClick?: (row: T) => void;
  menuPath?: string[];
  search?: AlfrescoQuery;
  customUrl?: string;
  onDataRefreshed?: (data: DocumentViewType[]) => void;
}

const dataTableValues: DataTableValues = {
  resetIcons: true
};

const Component = <T extends DocumentViewType>({
  children,
  columns,
  defaultSortAsc,
  defaultSortColumn,
  handleDoubleClick,
  menuPath,
  controls,
  customTitle,
  refreshPending,
  search,
  customUrl,
  isRowDisabled,
  onDataRefreshed
}: OwnProps<T>) => {
  const stateProps = useSelector(
    (state: RootStateType) => state.documentViewReducer
  );
  const {
    items,
    itemsCount,
    maxItems,
    pageNumber,
    pending,
    shouldRefreshTable,
    source,
    selected
  } = stateProps;
  let { sortAsc, sortColumnIndex, sortKeys } = stateProps;

  useEffect(() => {
    onDataRefreshed?.(items);
  }, [items, onDataRefreshed]);

  const globalMaxItems = useSelector(
    (state: RootStateType) => state.loginReducer.global.maxItems
  );
  const dispatch = useDispatch<Dispatch<DocumentViewActionType>>();

  const rowsPerPage = maxItems || globalMaxItems;

  const loadData: VoidFunction = () => {
    dataTableValues.resetIcons = true;
    dispatch(
      documentViewAction.request({
        children,
        customUrl,
        maxItems: rowsPerPage,
        pageNumber,
        search,
        sortAsc: !!sortAsc,
        sortColumnIndex,
        sortKeys
      })
    );
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      if (shouldRefreshTable) {
        loadData();
        dispatch(documentViewAction__Refresh(false));
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [shouldRefreshTable]
  );

  useEffect(
    () => {
      return () => {
        dispatch(documentViewAction__Clear());
      };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (defaultSortAsc && sortAsc === null) {
      sortAsc = defaultSortAsc;
    }

    if (defaultSortColumn && sortColumnIndex === null) {
      sortColumnIndex = columns.indexOf(defaultSortColumn);
      sortKeys = defaultSortColumn.keys;
    }
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    dataTableValues.resetIcons = true;
    dispatch(
      documentViewAction.request({
        children,
        customUrl,
        maxItems: rowsPerPage,
        pageNumber: page,
        search,
        sortAsc: !!sortAsc,
        sortColumnIndex,
        sortKeys
      })
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dataTableValues.resetIcons = true;
    dispatch(
      documentViewAction.request({
        children,
        customUrl,
        maxItems: parseInt(event.target.value, 10),
        pageNumber: 0,
        search,
        sortAsc: !!sortAsc,
        sortColumnIndex,
        sortKeys
      })
    );
  };

  const handleSortingChange = (index: number, keys: string[]) => () => {
    dataTableValues.resetIcons = true;
    dispatch(
      documentViewAction.request({
        children,
        customUrl,
        maxItems: rowsPerPage,
        pageNumber: 0,
        search,
        sortAsc: index === sortColumnIndex ? !sortAsc : false,
        sortColumnIndex: index,
        sortKeys: keys
      })
    );
  };

  const setSelected = (rows: T[]) => {
    dispatch(documentViewAction__SetSelected(rows));
  };

  const footerText = useMemo(() => {
    const lastReadDate = tryToGetLastReadDate(
      source?.properties?.ssl?.timestampText
    );

    return lastReadDate
      ? `${t(translationPath(lang.general.lastReadDate), {
          date: formatDate(lastReadDate.toISOString())
        })}`
      : "";
  }, [source?.properties?.ssl?.timestampText]);

  return (
    <DataTable
      breadcrumbs={menuPath || []}
      columns={columns}
      controls={controls}
      customTitle={customTitle}
      dataTableValues={dataTableValues}
      defaultActionFirst={true}
      footerText={footerText}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleDoubleClick={handleDoubleClick}
      handleSelectionChange={setSelected}
      handleSortingChange={handleSortingChange}
      pageNumber={pageNumber}
      pending={pending}
      isRowDisabled={isRowDisabled}
      refreshPending={refreshPending}
      refreshTable={loadData}
      rows={items as T[]}
      rowsCount={itemsCount}
      rowsPerPage={rowsPerPage}
      selected={selected as T[]}
      sortAsc={!!sortAsc}
      sortColumnIndex={sortColumnIndex}
    />
  );
};

export default Component;
