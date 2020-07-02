import { Gesture } from "@material-ui/icons";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ControlsType, ReadonlyControlsType } from "./_types";

export const controls: ControlsType = ({ handleSign }) => {
  return {
    multi: {
      items: [
        {
          action: handleSign,
          icon: <Gesture />,
          title: t(translationPath(lang.general.signAndTimeStamp))
        }
      ]
    },
    single: {
      items: [
        {
          action: handleSign,
          icon: <Gesture />,
          title: t(translationPath(lang.general.signAndTimeStamp))
        }
      ]
    }
  };
};

export const readOnlyControls: ReadonlyControlsType = ({ handleSign }) => ({
  multi: {
    items: [
      {
        action: handleSign,
        icon: <Gesture />,
        title: t(translationPath(lang.general.signAndTimeStamp))
      }
    ]
  },
  single: {
    items: [
      {
        action: handleSign,
        icon: <Gesture />,
        title: t(translationPath(lang.general.signAndTimeStamp))
      }
    ]
  }
});
