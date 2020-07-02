import { DependencyInjection, TokenType } from "./services/DependencyInjection";

let index: DependencyInjection | null = null;

export function getDic(): DependencyInjection {
  if (!index) {
    index = new DependencyInjection();
  }

  return index;
}

export const getService = <T>(token: TokenType<T>) =>
  getDic().getInjector().get(token);
