import loadable from "@loadable/component";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import lang from "translation/lang";
import { ErrorBoundary } from "../../../../../components/errorBoundary";
import { LoadingIndicator } from "../../../../../components/loadingIndicator/LoadingIndicator";
import { PreviewerType } from "../_types";

const PdfComponent = loadable(() => import("./PdfPreview"));

export const PdfPreviewLazy: PreviewerType = React.memo<PreviewerType>(
  (props) => (
    <ErrorBoundary
      message={t(translationPath(lang.errorBoundary.loadingFailed))}
    >
      <PdfComponent {...props} fallback={<LoadingIndicator />} />
    </ErrorBoundary>
  )
) as PreviewerType;
