import Menu from "@material-ui/core/Menu";
import { MenuItemProps } from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRight from "@material-ui/icons/ArrowRight";
import clsx from "clsx";
import React, { useImperativeHandle } from "react";
import { ListItemWithPadding, MenuItemStyled } from "./MenuItems.styles";

interface CascadingMenuItemProps extends Omit<MenuItemProps, "button"> {
  button?: true | undefined;
  containerProps?: React.HTMLAttributes<HTMLElement> &
    React.RefAttributes<HTMLElement | null>;
  parentMenuOpen: boolean;
  label?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const TRANSPARENT = "rgba(0,0,0,0)";
const useMenuItemStyles = makeStyles(() => ({
  root: (props: { open: boolean }) => ({
    backgroundColor: props.open ? "#e6e6e6" : TRANSPARENT
  })
}));

const CascadingMenuItem = React.forwardRef<
  HTMLLIElement | null,
  CascadingMenuItemProps
>((props, ref) => {
  const {
    parentMenuOpen,
    label,
    rightIcon = <ArrowRight />,
    children,
    className,
    containerProps: ContainerPropsProp = {},
    ...menuItemProps
  } = props;
  let { tabIndex } = props;

  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp;

  const menuItemRef = React.useRef<HTMLLIElement>(null);
  useImperativeHandle(ref, () => menuItemRef.current as HTMLLIElement);

  const containerRef = React.useRef<HTMLDivElement>(null);
  useImperativeHandle(containerRefProp, () => containerRef.current);

  const menuContainerRef = React.useRef<HTMLDivElement>(null);

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setIsSubMenuOpen(true);

    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event);
    }
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    setIsSubMenuOpen(false);

    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event);
    }
  };

  const isSubmenuFocused = () => {
    const active = containerRef.current?.ownerDocument?.activeElement;
    const currentChildren = menuContainerRef.current?.children || [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < currentChildren.length; i++) {
      if (currentChildren[i] === active) {
        return true;
      }
    }
    return false;
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (event.target === containerRef.current) {
      setIsSubMenuOpen(true);
    }

    if (ContainerProps?.onFocus) {
      ContainerProps.onFocus(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      return;
    }

    if (isSubmenuFocused()) {
      event.stopPropagation();
    }

    const active = containerRef.current?.ownerDocument?.activeElement;

    if (event.key === "ArrowLeft" && isSubmenuFocused()) {
      containerRef.current?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      event.target === containerRef.current &&
      event.target === active
    ) {
      const firstChild = menuContainerRef.current?.children[0] as
        | HTMLElement
        | undefined;
      firstChild?.focus();
    }
  };

  const open = isSubMenuOpen && parentMenuOpen;
  const menuItemClasses = useMenuItemStyles({ open });

  if (!props.disabled) {
    tabIndex = tabIndex !== undefined ? tabIndex : -1;
  }

  const onClose = () => {
    setIsSubMenuOpen(false);
  };

  return (
    <div
      {...ContainerProps}
      ref={containerRef}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <ListItemWithPadding button={true} padding={0}>
        <MenuItemStyled
          {...menuItemProps}
          className={clsx(menuItemClasses.root, className)}
          ref={menuItemRef}
        >
          {label}
          {rightIcon}
        </MenuItemStyled>
      </ListItemWithPadding>
      <Menu
        style={{ pointerEvents: "none" }}
        anchorEl={menuItemRef.current}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top"
        }}
        transformOrigin={{
          horizontal: "left",
          vertical: "top"
        }}
        open={open}
        autoFocus={false}
        disableAutoFocus={true}
        disableEnforceFocus={true}
        onClose={onClose}
      >
        <div ref={menuContainerRef} style={{ pointerEvents: "auto" }}>
          {children}
        </div>
      </Menu>
    </div>
  );
});

export default CascadingMenuItem;
