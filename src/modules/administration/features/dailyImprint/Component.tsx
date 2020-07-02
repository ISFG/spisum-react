import { GetApp } from "@material-ui/icons";
import { ControlsBarType, DataColumn } from "core/components/dataTable/_types";
import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import React from "react";
import { useDispatch } from "react-redux";
import { classPath, translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { callAsyncAction } from "../../../../core/action";
import { getImprintAction } from "../../../../core/api/imprint/_actions";
import { DailyImprint, dailyImprintProxy } from "./_types";

const Component = () => {
  const dispatch = useDispatch();
  const columns: DataColumn<DailyImprint>[] = [
    // {
    //   keys: [classPath(dailyImprintProxy.id).path],
    //   label: t(translationPath(lang.general.id))
    // },
    {
      keys: [classPath(dailyImprintProxy.name).path],
      label: t(translationPath(lang.general.name))
    },
    {
      isDate: true,
      keys: [classPath(dailyImprintProxy.createdAt).path],
      label: t(translationPath(lang.general.creationDate))
    }
  ];

  const controls: ControlsBarType<DailyImprint> = {
    single: {
      items: [
        {
          action: (selected: DailyImprint[]) => {
            dispatch(
              callAsyncAction({
                action: getImprintAction,
                payload: {
                  nodeId: selected[0].id
                }
              })
            );
          },
          icon: <GetApp />,
          title: t(translationPath(lang.general.download))
        }
      ]
    }
  };

  return (
    <MenuLayout>
      <DocumentView
        children={{
          relativePath: "Sites/Logs/documentLibrary/Imprint"
        }}
        columns={columns}
        controls={controls}
        customTitle={t(translationPath(lang.menu.items.dailyImprint))}
        defaultSortAsc={true}
      />
    </MenuLayout>
  );
};

export default Component;
