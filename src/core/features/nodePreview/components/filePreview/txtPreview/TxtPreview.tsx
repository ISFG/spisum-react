import { PreviewerProps, PreviewerType } from "../_types";
import React from "react";
import { StyledWrapper } from "./TxtPreview.styles";

export const TxtPreview: PreviewerType = React.memo(
  ({ content }: PreviewerProps) => <StyledWrapper>{content}</StyledWrapper>
) as PreviewerType;
