import { NodeVersion } from "core/api/models";
import DataTable from "core/components/dataTable";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { useStyles } from "core/components/dialog/Dialog.styles";
import { DataTableValues } from "core/components/documentView/_types";
import React from "react";
import { formatDate } from "share/utils/convert";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t, withTranslation, WithTranslation } from "translation/i18n";
import { nodeVersionProxy } from "./_types";

export const columns: DataColumn<NodeVersion>[] = [
  {
    isDate: true,
    keys: [classPath(nodeVersionProxy.id).path],
    label: t(translationPath(lang.general.versionId))
  },
  {
    getValue: (nodeVersion) => formatDate(nodeVersion.modifiedAt),
    keys: [classPath(nodeVersionProxy.modifiedAt).path],
    label: t(translationPath(lang.general.modifiedAtOfVersion))
  },
  {
    getValue: (nodeVersion) => nodeVersion.modifiedByUser.displayName,
    keys: [classPath(nodeVersionProxy.modifiedByUser.displayName).path],
    label: t(translationPath(lang.general.versionAuthor))
  }
];

const handleSortingChange: (
  index: number,
  keys: string[]
) => (
  event: React.MouseEvent<HTMLTableRowElement, MouseEvent>
) => void = () => () => void 0;

interface OwnProps {
  isLoading: boolean;
  items: NodeVersion[];
  pageNumber: number;
  totalItems: number;
  refreshTable: VoidFunction;
  rowsPerPage: number;
  handleChangePage: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  controls: ControlsBarType<NodeVersion>;
}

const VersionTab = ({
  isLoading,
  items,
  totalItems,
  refreshTable,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  pageNumber,
  controls
}: OwnProps & WithTranslation) => {
  const dataTableValues: DataTableValues = {
    resetIcons: true
  };
  const dialogClasses = useStyles();

  return (
    <div className="body-fullsize">
      <DataTable
        controls={controls}
        columns={columns}
        dataTableValues={dataTableValues}
        defaultActionFirst={true}
        breadcrumbs={[]}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSortingChange={handleSortingChange}
        pageNumber={pageNumber}
        pending={isLoading}
        tableLayoutClassName="dialog__table-layout"
        paginationClassName={dialogClasses.tablePagination}
        refreshTable={refreshTable}
        rows={items}
        rowsCount={totalItems}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default withTranslation()(React.memo(VersionTab));
