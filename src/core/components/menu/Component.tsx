import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import accountCircleIcon from "assets/icons/accountCircleIcon.png";
import headerLogoImg from "assets/images/headerLogo.png";
import clsx from "clsx";
import { logoutAction } from "core/features/logout/_actions";
import { CoreRoutes } from "core/routes";
import React, { ReactText } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { RootStateType } from "reducers";
import { translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { dialogOpenAction } from "../dialog/_actions";
import { DialogType } from "../dialog/_types";
import Search from "../search/SearchInput";
import {
  ContentLayout,
  Main,
  MenuFlexLayout,
  useStyles
} from "./Component.styles";
import MenuItems from "./MenuItems";
import { getActiveItemId } from "./MenuItems.methods";
import { MenuItemType, SubmenuItemType } from "./_types";

interface OwnProps {
  children: React.ReactElement<{ menuPath: string[] }> | ReactText;
  itemsOfMenu: MenuItemType[];
}

interface MenuPathType {
  menuPath: string[];
  itemsOfMenu: (MenuItemType | SubmenuItemType)[];
  location: string;
}

let isOpenRemember = true;

const getMenuPath = ({ itemsOfMenu, location, menuPath }: MenuPathType) => {
  if (!itemsOfMenu || !itemsOfMenu.length) {
    return menuPath;
  }
  const id = getActiveItemId(location, itemsOfMenu);
  if (id === -1) {
    return menuPath;
  }
  if (itemsOfMenu[id] && itemsOfMenu[id].text) {
    menuPath.push(itemsOfMenu[id].text!);
  }
  menuPath = getMenuPath({
    itemsOfMenu: itemsOfMenu[id].submenu || [],
    location,
    menuPath
  });

  return menuPath;
};

const MenuLayout = ({
  children,
  itemsOfMenu,
  location
}: OwnProps & RouteComponentProps) => {
  const { user, activeGroup: activeGroupName, groups, isAdmin } = useSelector(
    (state: RootStateType) => state?.loginReducer?.session
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = React.useState(isOpenRemember);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerOpenClose = () => {
    isOpenRemember = !isOpen;
    setOpen(!isOpen);
  };

  const logOut = () => {
    handleClose();
    dispatch(logoutAction.request());
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const activeGroup = groups.find((group) => group.id === activeGroupName);

  const changeGroup = () => {
    handleClose();
    dispatch(
      dialogOpenAction({
        dialogType: DialogType.GroupChange
      })
    );
  };

  const changePassword = () => {
    handleClose();
    dispatch(
      dialogOpenAction({
        dialogType: DialogType.ChangePassword
      })
    );
  };

  if (typeof children === "object") {
    children = React.cloneElement(children, {
      menuPath: getMenuPath({
        itemsOfMenu,
        location: location.pathname.toLowerCase().trimEnd("/"),
        menuPath: []
      })
    });
  }

  return (
    <MenuFlexLayout>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isOpen
        })}
        position="fixed"
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-label={
              isOpen
                ? t(translationPath(lang.menu.packMenu))
                : t(translationPath(lang.menu.unpackMenu))
            }
            color="inherit"
            data-test-id="pack-unpack-menu-icon"
            edge="start"
            onClick={handleDrawerOpenClose}
          >
            <MenuIcon style={{ marginLeft: "-3px", fontSize: "24px" }} />
          </IconButton>
          <Link to={CoreRoutes.DASHBOARD} className={classes.imgLink}>
            <img
              className={classes.img}
              src={headerLogoImg}
              alt="SpisUm Logo"
            />
          </Link>
          <Typography className={classes.title} noWrap={true} />
          <Search />
          <div className={classes.userInfo}>
            <Avatar src={accountCircleIcon} />
            <div className={classes.userNameAndGroupWrapper}>
              <Tooltip title={user?.displayName || ""}>
                <span className={classes.userName}>
                  {isAdmin
                    ? t(translationPath(lang.general.admin))
                    : user?.displayName}
                </span>
              </Tooltip>
              <Tooltip title={activeGroup?.displayName || ""}>
                <span className={classes.activeGroup}>
                  {activeGroup?.displayName}
                </span>
              </Tooltip>
            </div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              data-test-id="toolbar-logo"
              color="inherit"
              onClick={handleMenu}
            >
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: "right",
                vertical: "top"
              }}
              keepMounted={true}
              transformOrigin={{
                horizontal: "right",
                vertical: "top"
              }}
              open={open}
              onClose={handleClose}
            >
              {groups.length > 1 && (
                <MenuItem onClick={changeGroup}>
                  {t(translationPath(lang.general.changeGroup))}
                </MenuItem>
              )}
              <MenuItem onClick={changePassword}>
                {t(translationPath(lang.dialog.title.changePassword))}
              </MenuItem>
              <MenuItem onClick={logOut}>
                {t(translationPath(lang.menu.logout))}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <ContentLayout>
        <Drawer
          classes={{
            paper: clsx(classes.paper, {
              [classes.drawerOpen]: isOpen,
              [classes.drawerClose]: !isOpen
            })
          }}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen
          })}
          variant="permanent"
        >
          <MenuItems isOpen={isOpen} itemsOfMenu={itemsOfMenu} />
        </Drawer>
        <Main className={classes.content}>
          <div
            className={clsx(classes.main, {
              [classes.mainDrawerOpen]: isOpen,
              [classes.mainDrawerClose]: !isOpen
            })}
          >
            {children}
          </div>
        </Main>
      </ContentLayout>
    </MenuFlexLayout>
  );
};

export default withRouter(MenuLayout);
