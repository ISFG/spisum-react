import {
  DialogContentPropsType,
  DialogContentType
} from "core/components/dialog/_types";
import React from "react";
import ComponentsContainer from "./ComponentsContainer";

export const RepositoryAndShreddingPlanDialog: DialogContentType["content"] = (
  props: DialogContentPropsType
) => {
  return (
    <div className="body-fullsize">
      <ComponentsContainer {...props} />
    </div>
  );
};
