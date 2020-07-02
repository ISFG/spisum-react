import { createProxy } from "../../../utils/getPath";

export type ShreddingDiscardFormValues = {
  date?: Date | null;
  reason: string;
};

export const shreddingDiscardFormValuesProxy = createProxy<
  ShreddingDiscardFormValues
>();
