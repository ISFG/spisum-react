import { SpisumNodeTypes } from "enums";
import { lang, t } from "translation/i18n";
import { translationPath } from "./getPath";

export const getNameTypeMap = (nodeType: string) => {
  const nameTypeMap = {
    [SpisumNodeTypes.ShipmentDatabox]: t(
      translationPath(lang.enums.deliveryMode.databox)
    ),
    [SpisumNodeTypes.ShipmentEmail]: t(
      translationPath(lang.enums.deliveryMode.email)
    ),
    [SpisumNodeTypes.ShipmentPost]: t(
      translationPath(lang.enums.deliveryMode.post)
    ),
    [SpisumNodeTypes.ShipmentPersonally]: t(
      translationPath(lang.enums.deliveryMode.personally)
    ),
    [SpisumNodeTypes.ShipmentPublish]: t(
      translationPath(lang.enums.deliveryMode.publish)
    )
  };

  return nameTypeMap[nodeType];
};
