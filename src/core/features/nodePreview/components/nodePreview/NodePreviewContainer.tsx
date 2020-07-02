import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { LoadingIndicator } from "../../../../components/loadingIndicator/LoadingIndicator";
import { useNodeContent } from "../../hooks/useNodeContent";
import { PreviewState } from "../../_types";
import { FilePreview } from "../filePreview/FilePreview";

interface OwnProps {
  name: string;
  nodeId: string;
  nodeType: string;
  componentId: string;
}

export const NodePreviewContainer = React.memo(
  ({ nodeId, name, nodeType, componentId }: OwnProps) => {
    const { state, file } = useNodeContent(nodeId, name, nodeType, componentId);

    if (state === PreviewState.Downloading) {
      return <LoadingIndicator />;
    }

    if (state === PreviewState.Error || !file) {
      return <div>{t(translationPath(lang.nodePreview.errorState))}</div>;
    }

    return <FilePreview name={file.name || ""} content={file.content} />;
  }
);
