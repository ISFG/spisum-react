import { Popper, Tooltip, Typography } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { MoreVert } from "@material-ui/icons";
import React, { useState } from "react";
import {
  ActionBarContainer, ActionBarItemElement,
  ActionBarSection,
  ActionBarWrapper,
  ExpandedItem,
  Path,
  PopoverDialog,
  Title
} from "./Component.styles";
import {
  ControlsBarActionType,
  ControlsBarItemType,
  ControlsBarType
} from "./_types";
import { ActionBarItem } from "./ActionBarItem";

export interface ActionBarProps<T> {
  breadcrumbs: string[];
  controls?: ControlsBarType<T>;
  customTitle?: string;
  customActionBarClassName?: string;
  refreshTable: VoidFunction;
  selected: T[];
  title?: string;
  refreshPending?: boolean;
  defaultActionFirst?: boolean;
}

const renderButtons = <T,>(
  props: ActionBarProps<T>,
  items: ControlsBarItemType<T>[]
) => (popped: boolean = true) =>
  items.map((item, itemIndex) => (
    <ActionBarItem
      key={itemIndex}
      item={item}
      popped={popped}
      selected={props.selected}
      refreshTable={props.refreshTable}
    />
  ));

const getTitle = (breadcrumbs: string[]) => {
  const size = breadcrumbs.length;
  if (size) {
    if (size === 1) return breadcrumbs[0];
    return breadcrumbs[size - 2];
  }
  return null;
};

const RenderAdditionalButtons = <T,>({
  more,
  props
}: {
  more: ControlsBarItemType<T>[];
  props: ActionBarProps<T>;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "AdditionalButtons" : undefined;
  const onOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ActionBarItemElement xs="auto" item={true} onClick={onOpen}>
        <Tooltip title="More actions" placement="top">
          <MoreVert />
        </Tooltip>
      </ActionBarItemElement>
      <Popper id={id} open={isOpen} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <PopoverDialog>{renderButtons(props, more)(false)}</PopoverDialog>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

const renderActionButtons = <T,>(
  props: ActionBarProps<T>,
  control?: ControlsBarActionType<T>
) => {
  if (!control) return null;
  return (
    <>
      {control.items &&
        control.items.length &&
        renderButtons(props, filterActions(props.selected, control.items))()}
      {control.more && control.more.length && (
        <RenderAdditionalButtons
          more={filterActions(props.selected, control.more)}
          props={props}
        />
      )}
    </>
  );
};

const filterActions = <T,>(selected: T[], controls: ControlsBarItemType<T>[]) =>
  controls?.filter((control) => {
    if (!control.filter) {
      return true;
    }

    const controlCanBeShownForItem = (item: T) => control.filter?.(item);

    // for default actions:
    // - "selected" is an empty array
    // - we still want to run the filter
    if (!selected.length && !controlCanBeShownForItem({} as T)) {
      return false;
    }

    return selected.filter(controlCanBeShownForItem).length === selected.length;
  });

const Actions = <T,>(props: ActionBarProps<T>) => {
  const { selected, controls } = props;

  const getButtons = () => {
    if (selected.length === 1) {
      return renderActionButtons(props, controls?.single);
    } else if (selected.length > 1) {
      return renderActionButtons(props, controls?.multi);
    }

    return null;
  };

  return (
    <ActionBarSection xs={5} item={true}>
      <ActionBarWrapper container={true}>
        {!props.defaultActionFirst && getButtons()}
        {renderActionButtons(props, controls?.default)}
        {props.defaultActionFirst && getButtons()}
      </ActionBarWrapper>
    </ActionBarSection>
  );
};

const ActionBar = <T,>(props: ActionBarProps<T>) => {
  const { breadcrumbs, customTitle, customActionBarClassName = "" } = props;

  return (
    <ActionBarContainer
      className={`${customActionBarClassName} action-bar__container`}
      container={true}
      alignItems="center"
      justify="space-between"
      alignContent="flex-end"
      direction="row"
    >
      <ActionBarSection xs={7} item={true}>
        <Title className="title" variant="h5" gutterBottom={true}>
          {customTitle || getTitle(breadcrumbs)}
        </Title>
        <Path separator="›" aria-label="breadcrumb">
          {breadcrumbs &&
            breadcrumbs.length &&
            breadcrumbs.map((item) => (
              <Typography key={item} color="textPrimary">
                {item}
              </Typography>
            ))}
        </Path>
      </ActionBarSection>
      <Actions {...props} />
    </ActionBarContainer>
  );
};

const typedMemo: <T>(c: T) => T = React.memo;
export default typedMemo(ActionBar);
