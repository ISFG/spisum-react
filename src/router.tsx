import { MenuItemType } from "core/components/menu/_types";
import Dashboard from "core/features/dashboard";
import { CoreRoutes } from "core/routes";
import { DispatchRoutes } from "modules/dispatch/routes";
import { EvidenceRoutes } from "modules/evidence/routes";
import { RecordRetentionProcessRoutes } from "modules/recordRetentionProcess/routes";
import { RepositoryRoutes } from "modules/repository/routes";
import { SignatureBookRoutes } from "modules/signatureBook/routes";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "share/components/ProtectedRoute";
import ResolveDefaultRoute from "share/components/ResolveDefaultRoute";
import { redirectFromMenu } from "share/utils/routerRedirect";
import SearchComponent from "./core/components/search/SearchComponent";
import Login from "./core/features/login";
import { useMenuItemsWithPermissions } from "./core/hooks/useMenuItemsWithPermissons";
import { AdministrationRoutes } from "./modules/administration/routes";
import MailRoomRouter from "./modules/mailroom/router";
import { MailroomRoutes } from "./modules/mailroom/routes";

interface RouterPropsType {
  itemsOfMenu?: MenuItemType[];
}

const Router = ({
  itemsOfMenu,
  location
}: RouteComponentProps & RouterPropsType) => {
  const itemsOfMenuWithPerms = useMenuItemsWithPermissions();
  const itemsOfMenuForRouter = itemsOfMenu || itemsOfMenuWithPerms;

  return (
    <Switch>
      {redirectFromMenu(location.pathname, itemsOfMenuForRouter)}
      {MailRoomRouter}
      <ProtectedRoute
        exact={true}
        children={<Dashboard />}
        path={CoreRoutes.DASHBOARD}
      />
      <ProtectedRoute
        exact={true}
        children={<SearchComponent />}
        path={CoreRoutes.SEARCH}
      />
      <Route exact={true} path={CoreRoutes.LOGIN}>
        <ResolveDefaultRoute
          defaultChildren={<Login />}
          itemsOfMenu={itemsOfMenuForRouter}
        />
      </Route>
      <ResolveDefaultRoute itemsOfMenu={itemsOfMenuForRouter} />
    </Switch>
  );
};

export type RootRouterType =
  | CoreRoutes
  | DispatchRoutes
  | EvidenceRoutes
  | MailroomRoutes
  | RecordRetentionProcessRoutes
  | RepositoryRoutes
  | SignatureBookRoutes
  | AdministrationRoutes;

export default withRouter(Router);
