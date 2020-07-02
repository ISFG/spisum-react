import {
  RemoveCircleOutlineOutlined,
  Save,
  SwapVert,
  Visibility
} from "@material-ui/icons";
import { ComponentUpload } from "core/components/dialog/tabs/components/ComponentUpload";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ControlsType, ReadonlyControlsType } from "./_types";

export const controls: ControlsType = ({
  handleIsComponentDeletable,
  handleDeleteComponent,
  handleUploadComponent,
  handleDownloadComponent,
  handleShowPreview,
  handleSwapComponentContent
}) => {
  return {
    default: {
      items: [
        {
          action: () => {},
          icon: () => (
            <ComponentUpload handleUploadComponent={handleUploadComponent} />
          ),
          title: t(translationPath(lang.general.add))
        }
      ]
    },
    multi: {
      items: [
        {
          action: handleDeleteComponent,
          filter: (file) => handleIsComponentDeletable(file),
          icon: <RemoveCircleOutlineOutlined />,
          title: t(translationPath(lang.general.remove))
        },
        {
          action: handleDownloadComponent,
          icon: <Save />,
          title: t(translationPath(lang.general.download))
        }
      ]
    },
    single: {
      items: [
        {
          action: handleDeleteComponent,
          filter: (file) => handleIsComponentDeletable(file),
          icon: <RemoveCircleOutlineOutlined />,
          title: t(translationPath(lang.general.remove))
        },
        {
          action: () => {},
          icon: (selectedComponents) => {
            const handleSelected = (selected: globalThis.File[]) =>
              handleSwapComponentContent(selectedComponents, selected);

            return (
              <ComponentUpload
                handleUploadComponent={handleSelected}
                multipleFilesAllowed={false}
                icon={<SwapVert />}
                title={t(translationPath(lang.general.uploadNewVersion))}
              />
            );
          }
        },
        {
          action: handleDownloadComponent,
          icon: <Save />,
          title: t(translationPath(lang.general.download))
        },
        {
          action: handleShowPreview,
          icon: <Visibility />,
          title: t(translationPath(lang.general.showPreview))
        }
        /* V2
        {
          action: handleRenameComponent,
          icon: <Edit />,
          title: t(translationPath(lang.general.rename))
        }
        */
      ]
    }
  };
};

export const readOnlyControls: ReadonlyControlsType = ({
  handleShowPreview
}) => ({
  single: {
    items: [
      {
        action: handleShowPreview,
        icon: <Visibility />,
        title: t(translationPath(lang.general.showPreview))
      }
    ]
  }
});
