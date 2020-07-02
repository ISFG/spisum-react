import {
  Input,
  RemoveCircleOutlineOutlined,
  Save,
  SwapVert,
  Visibility
} from "@material-ui/icons";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ComponentUpload } from "./ComponentUpload";
import { ControlsType, ReadonlyControlsType } from "./_types";

export const controls: ControlsType = ({
  handleCanConvertToOutputFormat,
  handleCanCreateComponent,
  handleCanDeleteComponent,
  handleCanShowPreview,
  handleCanUploadNewVersion,
  handleConvertToOutputFormat,
  handleDeleteComponent,
  handleDownloadComponent,
  handleShowPreview,
  handleSwapComponentContent,
  handleUploadComponent
}) => {
  return {
    default: {
      items: [
        {
          filter: () => handleCanCreateComponent(),
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
          filter: () => handleCanDeleteComponent(),
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
          filter: () => handleCanDeleteComponent(),
          icon: <RemoveCircleOutlineOutlined />,
          title: t(translationPath(lang.general.remove))
        },
        {
          action: handleDownloadComponent,
          icon: <Save />,
          title: t(translationPath(lang.general.download))
        },
        {
          action: handleShowPreview,
          filter: handleCanShowPreview,
          icon: <Visibility />,
          title: t(translationPath(lang.general.showPreview))
        },
        {
          filter: handleCanUploadNewVersion,
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
        /* V2
        {
          action: handleRenameComponent,
          filter: (file) => handleCanRenameComponent(),
          icon: <Edit />,
          title: t(translationPath(lang.general.rename))
        },
        */
        {
          action: handleConvertToOutputFormat,
          filter: handleCanConvertToOutputFormat,
          icon: <Input />,
          title: t(translationPath(lang.general.convertToOutputFormat))
        }
      ]
    }
  };
};

export const readOnlyControls: ReadonlyControlsType = ({
  handleCanShowPreview,
  handleShowPreview,
  handleDownloadComponent
}) => ({
  multi: {
    items: [
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
        action: handleDownloadComponent,
        icon: <Save />,
        title: t(translationPath(lang.general.download))
      },
      {
        action: handleShowPreview,
        filter: handleCanShowPreview,
        icon: <Visibility />,
        title: t(translationPath(lang.general.showPreview))
      }
    ]
  }
});
