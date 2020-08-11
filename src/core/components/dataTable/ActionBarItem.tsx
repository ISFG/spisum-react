import { Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ActionBarProps } from "./ActionBar";
import { ActionBarItemElement, ExpandedItem } from "./Component.styles";
import { ControlsBarItemType } from "./_types";

interface OwnProps<T> {
  selected: T[];
  refreshTable: ActionBarProps<T>["refreshTable"];
  item: ControlsBarItemType<T>;
  popped: boolean;
}

const notValidItemProps = {
  color: "#b9b9b9 !important",
  cursor: "default",
  fill: "#b9b9b9 !important"
};

export const ActionBarItem = <T,>({
  item,
  selected,
  refreshTable,
  popped
}: OwnProps<T>) => {
  const [isNotValidText, setIsNotValidText] = useState<string | null>(null);
  const handleClick = () => item.action?.(selected, refreshTable);
  const icon =
    typeof item.icon === "function" ? item.icon(selected) : item.icon;
  const title =
    typeof item.title === "function" ? item.title(selected) : item.title;

  const validItemProps = item.action
    ? {
        fill: "#131D1E !important",
        onClick: handleClick
      }
    : {};

  useEffect(() => {
    setIsNotValidText(null);

    Promise.resolve(item.validation?.(selected))
      .then((response) => {
        if (response) {
          setIsNotValidText(response);
        }
      })
      .catch(() => {
        // noop
      });
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ActionBarItemElement
      xs="auto"
      item={true}
      {...(item.validation && isNotValidText !== null
        ? notValidItemProps
        : validItemProps)}
    >
      {(popped &&
        (title ? (
          <Tooltip
            title={
              title +
              ((isNotValidText &&
                !!isNotValidText.trim() &&
                ` - ${isNotValidText}`) ||
                "")
            }
            placement="top"
          >
            {icon}
          </Tooltip>
        ) : (
          icon
        ))) || (
        <ExpandedItem>
          {(isNotValidText && (
            <Tooltip title={isNotValidText} placement="top">
              {icon}
            </Tooltip>
          )) ||
            icon}{" "}
          {title}
        </ExpandedItem>
      )}
    </ActionBarItemElement>
  );
};
