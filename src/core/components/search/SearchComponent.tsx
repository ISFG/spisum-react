import DocumentView from "core/components/documentView";
import MenuLayout from "core/components/layout/MenuLayout";
import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { RootStateType } from "reducers";
import { translationPath } from "share/utils/getPath";
import { alfrescoQuery, getSearchTerm } from "share/utils/query";
import { lang, t } from "translation/i18n";
import { defaultColumn, getColumns } from "./columns";

const SearchComponent = ({
  location
}: RouteComponentProps<{}, {}, { searchTerm: string }>) => {
  const session = useSelector(
    (state: RootStateType) => state.loginReducer.session
  );

  const term = location?.state ? location.state.searchTerm : "";

  return (
    <MenuLayout>
      <DocumentView
        columns={getColumns(session)}
        customTitle={t(translationPath(lang.general.search))}
        defaultSortAsc={true}
        defaultSortColumn={defaultColumn}
        search={{
          query: {
            query: alfrescoQuery({
              paths: [
                "Evidence/documentLibrary",
                "Mailroom/documentLibrary",
                "Repository/documentLibrary",
                "Shipments/documentLibrary"
              ],
              type: [],
              where: getSearchTerm(term)
            })
          }
        }}
      />
    </MenuLayout>
  );
};

export default withRouter(SearchComponent);
