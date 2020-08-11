import { Gesture } from "@material-ui/icons";
import { File } from "core/entities";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { ControlsType, ReadonlyControlsType } from "./_types";

export const controls: ControlsType = ({ handleSign, signer }) => {
  return {
    multi: {
      items: [
        {
          action: handleSign,
          icon: <Gesture />,
          title: t(translationPath(lang.general.signAndTimeStamp)),
          validation: (items: File[]) => {
            return !signer ? " " : null;
          }
        }
      ]
    },
    single: {
      items: [
        {
          action: handleSign,
          icon: <Gesture />,
          title: t(translationPath(lang.general.signAndTimeStamp)),
          validation: (items: File[]) => {
            return !signer ? " " : null;
          }
        }
      ]
    }
  };
};

export const readOnlyControls: ReadonlyControlsType = ({
  handleSign,
  signer
}) => ({
  multi: {
    items: [
      {
        action: handleSign,
        icon: <Gesture />,
        title: t(translationPath(lang.general.signAndTimeStamp)),
        validation: (items: File[]) => {
          return !signer ? " " : null;
        }
      }
    ]
  },
  single: {
    items: [
      {
        action: handleSign,
        icon: <Gesture />,
        title: t(translationPath(lang.general.signAndTimeStamp)),
        validation: (items: File[]) => {
          return !signer ? " " : null;
        }
      }
    ]
  }
});
