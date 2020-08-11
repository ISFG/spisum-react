import { StyledFormControlFifth } from "core/components/dialog/Dialog.styles";
import { sslPropsProxy } from "core/types";
import { DocumentState } from "enums";
import React from "react";
import { lang, t } from "translation/i18n";
import { lastPathMember, translationPath } from "../../../utils/getPath";
import { EnumSelect } from "../enumSelect/EnumSelect";

export const SslDocumentState = ({ isFile }: { isFile?: boolean }) => {
  return (
    <EnumSelect
      component={StyledFormControlFifth}
      enumType={DocumentState}
      firstEmpty={true}
      disabled={true}
      translations={lang.enums.documentState}
      name={lastPathMember(sslPropsProxy.state).path}
      label={t(
        translationPath(
          isFile ? lang.general.fileState : lang.general.documentState
        )
      )}
    />
  );
};
