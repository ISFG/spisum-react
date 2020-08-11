import {
  DialogContentPropsType,
  DialogType
} from "core/components/dialog/_types";
import NamedTitle from "core/components/namedTitle";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { createDocumentDialog } from "../baseDocumentDialog/documentDialogFactory";
import { RepositoryAndShreddingPlanDialog } from "./RepositoryAndShreddingPlanDialog";

export const repositoryAndShreddingPlanDialog = createDocumentDialog({
  content: RepositoryAndShreddingPlanDialog,
  title: (props: DialogContentPropsType) => (
    <NamedTitle
      text={t(translationPath(lang.dialog.title.repositoryAndShreddingPlan))}
      {...props}
    />
  ),
  type: DialogType.RepositoryAndShreddingPlan
});
