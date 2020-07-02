import { AddCircleOutline, Block, Edit } from "@material-ui/icons";
import MenuLayout from "core/components/layout/MenuLayout";
import React from "react";
import { useDispatch } from "react-redux";
import {
  openCreateUserDialogAction,
  openEditUserDialogAction
} from "../../../../core/api/user/_actions";
import { ApiURL } from "../../../../core/apiURL";
import {
  ControlsBarType,
  DataColumn
} from "../../../../core/components/dataTable/_types";
import { dialogOpenAction } from "../../../../core/components/dialog/_actions";
import { DialogType } from "../../../../core/components/dialog/_types";
import DocumentView from "../../../../core/components/documentView";
import { classPath, translationPath } from "../../../../share/utils/getPath";
import { lang, t } from "../../../../translation/i18n";
import { DisabledUsers, User, usersProxy } from "./_types";

const columns: DataColumn<User>[] = [
  {
    keys: [classPath(usersProxy.id).path],
    label: t(translationPath(lang.general.id))
  },
  {
    keys: [classPath(usersProxy.firstName).path],
    label: t(translationPath(lang.dialog.renameComponent.name))
  },
  {
    keys: [classPath(usersProxy.email).path],
    label: t(translationPath(lang.general.email))
  },
  {
    keys: [classPath(usersProxy?.properties?.ssl?.group).path],
    label: t(translationPath(lang.general.mainGroup))
  },
  {
    getValue: (item) => {
      return item.enabled
        ? t(translationPath(lang.general.yes))
        : t(translationPath(lang.general.no));
    },
    keys: [classPath(usersProxy.enabled).path],
    label: t(translationPath(lang.general.active))
  }
];

const Component = () => {
  const dispatch = useDispatch();

  const controls: ControlsBarType<User> = {
    default: {
      items: [
        {
          action: () => {
            dispatch(openCreateUserDialogAction());
          },
          icon: <AddCircleOutline />,
          title: t(translationPath(lang.general.createUser))
        }
      ]
    },
    single: {
      items: [
        {
          action: (selected) => {
            dispatch(openEditUserDialogAction(selected[0]));
          },
          filter: (item) => {
            return item.enabled;
          },
          icon: <Edit />,
          title: t(translationPath(lang.general.editUser))
        },
        {
          action: (selected) => {
            dispatch(
              dialogOpenAction({
                dialogData: selected[0],
                dialogType: DialogType.DeactivateUser
              })
            );
          },
          filter: (item) => {
            return item.enabled;
          },
          icon: <Block />,
          title: t(translationPath(lang.general.deactivate))
        }
      ]
    }
  };

  const isRowDisabled = ({ id }: User) => {
    return (
      id === DisabledUsers.Admin ||
      id === DisabledUsers.Guest ||
      id === DisabledUsers.Spisum
    );
  };

  return (
    <MenuLayout>
      <DocumentView
        customUrl={ApiURL.ADMIN_USERS}
        isRowDisabled={isRowDisabled}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.menu.items.users))}
        defaultSortAsc={true}
      />
    </MenuLayout>
  );
};

export default Component;
