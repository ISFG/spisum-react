import { MutableRefObject, useRef } from "react";

export function useStateWithoutRerender<StateType>(
  initialState: StateType
): [() => StateType, (newState: StateType) => void] {
  const ref: MutableRefObject<StateType> = useRef<StateType>(initialState);

  const setCurrentValue = (value: StateType) => (ref.current = value);
  const getCurrentValue = () => ref.current;

  // returning function, so the consumer always gets the actual ref value
  return [getCurrentValue, setCurrentValue];
}
