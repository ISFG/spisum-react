export type AsComType<Value, AdditionalProps> =
  | HandleValueProps<Value>
  | (HandleValueProps<Value> & AdditionalProps);

export interface HandleValueProps<Value> {
  error: boolean;
  value: Value;
  onChange: (value: Value) => void;
}
