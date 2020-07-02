import { useIsMountedRef } from "./useIsMountedRef";
import { useState } from "react";

export const useSafeSetState = <T>(initialValue: T): [T, (value: T) => void] => {
  const isMounted = useIsMountedRef();
  const [state, setState] = useState(initialValue);

  return [
    state,
    (value: T) => {
      if (!isMounted.current) {
        return;
      }

      setState(value);
    }
  ];
};
