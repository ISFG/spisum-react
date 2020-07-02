import {
  ComponentPreviewItem,
  RenderPreviewType
} from "core/components/dialog/_types";
import { isFile } from "core/entities";
import { FilePreview } from "core/features/nodePreview/components/filePreview/FilePreview";
import { NodePreviewContainer } from "core/features/nodePreview/components/nodePreview/NodePreviewContainer";
import React from "react";

export const renderComponentPreview: RenderPreviewType = (
  dialogData,
  previewItem
) => {
  if (!isFile(previewItem)) {
    return <FilePreview name="unsupported.unsupported" />;
  }

  const { id, name, nodeType, entityId } = previewItem as ComponentPreviewItem;

  return (
    <NodePreviewContainer
      nodeId={id}
      name={name || ""}
      nodeType={nodeType}
      componentId={entityId}
    />
  );
};
