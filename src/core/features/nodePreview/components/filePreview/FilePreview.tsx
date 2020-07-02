import React, { useMemo } from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { getFileExt } from "../../../../helpers/file";
import { PdfPreviewLazy } from "./pdfPreview/PdfPreview.lazy";
import { TxtPreview } from "./txtPreview/TxtPreview";
import { ContentType, PreviewersType } from "./_types";
import { UnsupportedFileWrapper } from "./FilePreview.styles";

interface OwnProps {
  name: string;
  content?: ContentType;
}

const previewers: PreviewersType = {
  jpeg: PdfPreviewLazy,
  jpg: PdfPreviewLazy,
  json: TxtPreview,
  pdf: PdfPreviewLazy,
  png: PdfPreviewLazy,
  txt: TxtPreview,
  xml: TxtPreview
};

export const FilePreview = React.memo(({ name, content }: OwnProps) => {
  const PreviewCom = useMemo(() => {
    const ext = getFileExt(name);

    return ext ? previewers[ext] : null;
  }, [name]);

  if (!PreviewCom) {
    return (
      <UnsupportedFileWrapper>
        {t(translationPath(lang.nodePreview.filePreview.unsupportedFile))}
      </UnsupportedFileWrapper>
    );
  }

  if (!content) {
    return (
      <div>{t(translationPath(lang.nodePreview.filePreview.emptyFile))}</div>
    );
  }

  return <PreviewCom name={name} content={content} />;
});
