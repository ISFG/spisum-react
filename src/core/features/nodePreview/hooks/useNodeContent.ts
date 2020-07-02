import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../../reducers";
import { nodeContentAction } from "../../../api/node/_actions";
import { PreviewState } from "../_types";

export const useNodeContent = (
  nodeId: string,
  name: string,
  nodeType: string,
  componentId: string
) => {
  const dispatch = useDispatch();
  const files = useSelector(
    (state: RootStateType) => state.nodePreviewReducer.files
  );

  const fileState = files[nodeId];

  useEffect(() => {
    if (fileState) {
      return;
    }

    dispatch(
      nodeContentAction.request({
        componentId,
        name,
        nodeId,
        nodeType
      })
    );
  }, [componentId, name, dispatch, fileState, nodeId, nodeType]);

  return (
    fileState || {
      state: PreviewState.Downloading
    }
  );
};
