import { DependencyInjection } from "./features/dependencyInjection/services/DependencyInjection";
import { HttpClient } from "./services/HttpClient";

export const register = (dic: DependencyInjection) => {
  dic.registerProviders([HttpClient]);
};
