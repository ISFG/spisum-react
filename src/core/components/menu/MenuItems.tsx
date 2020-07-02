import {
  Collapse,
  Divider,
  List,
  ListItemIcon,
  Menu,
  Tooltip
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { RootActionsType } from "actions";
import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import CascadingMenuItem from "./CascadingMenuItem";
import { getActiveItemId } from "./MenuItems.methods";
import {
  ListItemTextWithoutWidth,
  ListItemWithPadding,
  MenuItemStyled,
  PoweredByISFG,
  useStyles
} from "./MenuItems.styles";
import { MenuItemType, SubmenuItemType } from "./_types";

interface GetOpenIdParamsType {
  itemsOfMenu: (MenuItemType | SubmenuItemType)[];
  level: number;
  location: string;
}

interface OwnProps {
  closeMenu?: VoidFunction;
  isOpen: boolean;
  itemsOfMenu: (MenuItemType | SubmenuItemType)[];
  level?: number;
}

const keeOpenedMenuStack: number[] = [];

const getOpenId = ({ itemsOfMenu, level, location }: GetOpenIdParamsType) => {
  let activeId = getActiveItemId(location, itemsOfMenu);
  if (activeId === -1) {
    activeId = keeOpenedMenuStack[level];
  }
  if (activeId === undefined) {
    activeId = -1;
  }
  return activeId;
};

const MenuItems = (props: OwnProps & RouteComponentProps) => {
  const { history, isOpen, itemsOfMenu, level = 0, location } = props;
  let { closeMenu } = props;
  const dispatch = useDispatch<Dispatch<RootActionsType>>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openId, setOpenId] = React.useState<number>(
    getOpenId({
      itemsOfMenu,
      level,
      location: location.pathname.toLowerCase().trimEnd("/")
    })
  );
  const [menuId, setMenuId] = React.useState<number>(-1);
  const classes = useStyles();
  const handleClick = (index: number) => {
    const id = openId === index ? -1 : index;
    keeOpenedMenuStack.splice(level, keeOpenedMenuStack.length);
    keeOpenedMenuStack[level] = id;
    setOpenId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuId(-1);
  };

  if (!closeMenu) {
    closeMenu = handleMenuClose;
  }

  const createItem = (item: MenuItemType | SubmenuItemType, index: number) => {
    if (item.isHidden) return;
    const hasSubmenu = !!(item.submenu && item.submenu.length);

    const isActive = item.url === location.pathname;

    const isIn =
      (hasSubmenu && openId === index) || keeOpenedMenuStack[level] === index;

    const onClick = (event: React.MouseEvent<HTMLElement>) => {
      if (!isOpen) {
        setAnchorEl(event.currentTarget);
        setMenuId(index);
      }
      if (item.onClick && typeof item.onClick === "function") {
        item.onClick(dispatch);
        closeMenu!();
      }
      if (item.url && !item.redirectTo) {
        history.push(item.url);
        return;
      }
      if (isOpen && hasSubmenu) {
        handleClick(index);
      }
    };
    const icon = item.icon && (
      <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
    );
    const submenuContent = hasSubmenu && (
      <MenuItems
        {...props}
        closeMenu={closeMenu}
        isOpen={isOpen}
        itemsOfMenu={item.submenu as SubmenuItemType[]}
        level={level + 1}
      />
    );

    const listItemContent =
      (isOpen && (
        <>
          {icon && icon}
          <ListItemTextWithoutWidth
            level={level}
            primary={item.text}
            {...(isActive && { className: classes.active })}
          />
          {hasSubmenu &&
            level === 0 &&
            (isIn ? (
              <ExpandLess style={{ marginRight: "20px" }} />
            ) : (
              <ExpandMore style={{ marginRight: "20px" }} />
            ))}
        </>
      )) ||
      (!isOpen && (level === 0 || !hasSubmenu) && (
        <>
          {icon && (
            <Tooltip title={item.text || ""} aria-label={item.text}>
              {icon}
            </Tooltip>
          )}
          {!hasSubmenu && level > 0 && (
            <MenuItemStyled onClick={onClick}>{item.text}</MenuItemStyled>
          )}
        </>
      ));

    return (
      ((item as MenuItemType).isDivider === true && (
        <Divider key={index} />
      )) || (
        <React.Fragment key={index}>
          {listItemContent && (
            <ListItemWithPadding
              {...(item.__testId && { "data-test-id": item.__testId })}
              button={true}
              key={index}
              padding={10}
              onClick={onClick}
              {...(isOpen &&
                openId === index && { className: classes.mainMenu })}
              {...(!isOpen &&
                isActive &&
                openId === index && { className: classes.closeMainMenu })}
              {...(level >= 1 &&
                hasSubmenu &&
                isIn && { className: classes.treeSubMenuParent })}
            >
              {listItemContent}
            </ListItemWithPadding>
          )}
          {isOpen && hasSubmenu && (
            <Collapse
              in={isIn}
              timeout="auto"
              unmountOnExit={true}
              className={clsx(classes.collapse, {
                [classes.hide]: !isOpen
              })}
            >
              <List
                component="div"
                disablePadding={true}
                {...(level >= 1 && { className: classes.treeSubMenu })}
                {...(level === 0 && { className: classes.subMenu })}
              >
                {submenuContent}
              </List>
            </Collapse>
          )}
          {!isOpen && hasSubmenu && level === 0 && menuId === index && (
            <Menu anchorEl={anchorEl} open={true} onClose={handleMenuClose}>
              <span>{submenuContent}</span>
            </Menu>
          )}
          {!isOpen && hasSubmenu && level > 0 && (
            <CascadingMenuItem
              label={item.text}
              parentMenuOpen={true}
              onClick={onClick}
              style={{ marginTop: "10px" }}
            >
              <span>{submenuContent}</span>
            </CascadingMenuItem>
          )}
          {level <= 1 && <Divider />}
        </React.Fragment>
      )
    );
  };

  return (
    <>
      <List>
        {itemsOfMenu.map((item) => createItem(item, itemsOfMenu.indexOf(item)))}
      </List>
      {isOpen && !level && <PoweredByISFG />}
    </>
  );
};

export default withRouter(MenuItems);
