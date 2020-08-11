import { AddCircleOutline, Delete, Edit } from "@material-ui/icons";
import { ApiURL } from "core/apiURL";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import { dialogOpenAction } from "core/components/dialog/_actions";
import { DialogType } from "core/components/dialog/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import { SpisumGroups } from "enums";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { fallbackColumns, getColumns } from "./columns";
import { Member } from "./_types";

const Component = () => {
  const [cols, setCols] = useState<DataColumn<Member>[]>();
  const dispatch = useDispatch();
  const controls: ControlsBarType<Member> = {
    default: {
      items: [
        {
          action: () => {
            dispatch(
              dialogOpenAction({
                dialogProps: {},
                dialogType: DialogType.CreateOrganizationUnit
              })
            );
          },
          icon: <AddCircleOutline />,
          title: t(translationPath(lang.general.addOrganizationUnit))
        }
      ]
    },
    single: {
      items: [
        {
          action: (selected: Member[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: {
                  data: selected[0]
                },
                dialogType: DialogType.UpdateOrganizationUnit
              })
            );
          },
          icon: <Edit />,
          title: t(translationPath(lang.general.editOrganizationUnit))
        },
        {
          action: (selected: Member[]) => {
            dispatch(
              dialogOpenAction({
                dialogProps: {
                  data: selected[0]
                },
                dialogType: DialogType.DeleteOrganizationUnit
              })
            );
          },
          icon: <Delete />,
          title: t(translationPath(lang.general.removeOrganizationUnit))
        }
      ]
    }
  };

  // we need to update the dispatch / repository members when the underlying table is refreshed,
  // so we display correctly if an organisation unit is part of dispatch / repository group.
  // The underling table is refreshed when a new organizations unit is added.
  const onDataUpdated = useCallback(
    () =>
      getColumns()
        .then(setCols)
        .catch(() => {
          //noop
        }),
    []
  );

  return (
    <MenuLayout>
      <DocumentView
        customUrl={ApiURL.ADMIN_MEMBERS.replace(":group", SpisumGroups.Main)}
        columns={cols ? cols : fallbackColumns()}
        controls={controls}
        customTitle={t(translationPath(lang.menu.items.organizationUnits))}
        defaultSortAsc={true}
        onDataRefreshed={onDataUpdated}
      />
    </MenuLayout>
  );
};

export default Component;
