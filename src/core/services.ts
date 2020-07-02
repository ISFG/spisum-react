import { HttpClient } from "./features/httpClient/services/HttpClient";
import { getService } from "./features/dependencyInjection";

export const httpClient = () => getService<HttpClient>(HttpClient);
