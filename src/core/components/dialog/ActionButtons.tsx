import { Button } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { Spinner, useStyles } from "./Dialog.styles";
import { ActionButtonStateType, ActionType } from "./_types";

interface OwnProps {
  actions: ActionType[];
  onClose: VoidFunction;
  onActionClicked: (
    actionFn: ActionType["onClick"],
    buttonState: ActionButtonStateType
  ) => void;
}

const Component = ({
  actions,
  onClose,
  onActionClicked
}: OwnProps & WithTranslation) => {
  const classes = useStyles();

  const [buttonsState, setButtonsState] = useState({});

  const setIsPending = (index: number) => (isPending: boolean) => {
    setButtonsState({
      ...buttonsState,
      [index]: {
        isPending
      }
    });
  };

  const disabled = !!Object.keys(buttonsState).find(
    (index) => buttonsState[index].isPending
  );

  return (
    <>
      {actions.map(
        ({ name, onClick, type, color, colorThemeType }, actionIndex) => {
          const onClickHandler = () => {
            onActionClicked(onClick, {
              setIsPending: setIsPending(actionIndex)
            });
          };

          const actionColorThemeType = colorThemeType
            ? classes[colorThemeType]
            : {};

          const isPending =
            buttonsState[actionIndex] && buttonsState[actionIndex].isPending;

          return (
            <Button
              key={name}
              disabled={disabled}
              className={clsx(classes.action, actionColorThemeType)}
              color={color}
              data-test-id={`actions-input-${name.toLowerCase()}`}
              variant={type}
              onClick={onClickHandler}
              startIcon={isPending ? <Spinner size={20} /> : undefined}
            >
              {name}
            </Button>
          );
        }
      )}

      <Button
        className={classes.buttonCancel}
        data-test-id="actions-input-cancel"
        variant="text"
        onClick={onClose}
      >
        {t(translationPath(lang.modal.cancel))}
      </Button>
    </>
  );
};

export default withTranslation()(Component);
