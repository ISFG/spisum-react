import { DependencyInjection } from "./features/dependencyInjection/services/DependencyInjection";
import { HttpClient } from "./features/httpClient/services/HttpClient";
import { UrlService } from "./features/httpClient/services/UrlService";
import { AutocompleteFetcher } from "./services/AutocompleteFetcher";
import { Signer } from "./services/Signer";
import { Members } from "./services/Members";
import { DocumentComponents } from "./services/DocumentComponents";

export const register = (dic: DependencyInjection) => {
  dic.registerProviders([UrlService, HttpClient, AutocompleteFetcher, Signer, Members, DocumentComponents]);
};
