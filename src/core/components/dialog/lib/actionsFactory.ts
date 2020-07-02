import { ActionType } from "../_types";

export const primaryAction = (
  name: ActionType["name"],
  onClick: ActionType["onClick"]
): ActionType => ({
  color: "primary",
  name,
  onClick,
  type: "outlined"
});

export const secondaryAction = (
  name: ActionType["name"],
  onClick: ActionType["onClick"]
): ActionType => ({
  color: "secondary",
  name,
  onClick,
  type: "contained"
});

export const successAction = (
  name: ActionType["name"],
  onClick: ActionType["onClick"]
): ActionType => ({
  color: "secondary",
  colorThemeType: "success",
  name,
  onClick,
  type: "outlined"
});

export const errorAction = (
  name: ActionType["name"],
  onClick: ActionType["onClick"]
): ActionType => ({
  color: "secondary",
  colorThemeType: "error",
  name,
  onClick,
  type: "outlined"
});
