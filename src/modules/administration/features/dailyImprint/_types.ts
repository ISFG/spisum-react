import { createProxy } from "share/utils/getPath";

export interface DailyImprint {
  id: string;
  createdAt: Date;
  name: string;
}

export const dailyImprintProxy = createProxy<DailyImprint>();
