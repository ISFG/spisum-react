import { lookup } from "mime-types";
import React, { useEffect, useState } from "react";
import FilePreviewer from "react-file-previewer";
import "react-file-previewer/src/styles.css";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { PreviewerProps, PreviewerType } from "../_types";

export const PdfPreview: PreviewerType = React.memo(
  ({ name, content }: PreviewerProps) => {
    const [data, setData] = useState<string | null | ArrayBuffer>(null);

    useEffect(() => {
      if (!content) {
        return;
      }

      if (typeof content === "string") {
        setData(content);
        return;
      }

      if (!(content instanceof Blob)) {
        return;
      }

      const fr = new FileReader();
      fr.onloadend = () => {
        setData(fr.result);
      };
      fr.readAsDataURL(content);
    }, [content]);

    const mimeType = lookup(name);

    if (!mimeType) {
      return (
        <div>
          {t(translationPath(lang.nodePreview.filePreview.unsupportedFile))}
        </div>
      );
    }

    if (!data) {
      return <div />;
    }

    return (
      <FilePreviewer
        file={{
          mimeType,
          name,
          url: data
        }}
      />
    );
  }
) as PreviewerType;

export default PdfPreview;
