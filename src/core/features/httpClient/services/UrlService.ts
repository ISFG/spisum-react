import { Injectable } from "injection-js";
import { WildCards } from "./HttpClient";

@Injectable()
export class UrlService {
  public createUrl(
    suffixURL: string,
    params?: Record<string, string>,
    urlWildCards?: WildCards
  ) {
    const appURL = `${this.getUrl(
      this.replaceWildCards(suffixURL, urlWildCards)
    )}`;

    return (params && `${appURL}${this.query(params)}`) || appURL;
  }

  private query(params: Record<string, string>) {
    const queryString = Object.keys(params)
      .filter((x) => params[x] !== undefined)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&");

    return (queryString && `?${queryString}`) || "";
  }

  private getUrl(suffixURL: string) {
    return `${process.env.REACT_APP_PROTOCOL || "http"}://${
      process.env.REACT_APP_API_URL
    }${suffixURL}`;
  }

  private replaceWildCards(suffixURL: string, wildCards?: WildCards) {
    if (!wildCards) {
      return suffixURL;
    }

    return Object.keys(wildCards).reduce(
      (subject, key) => subject.replace(`:${key}`, `${wildCards[key]}`),
      suffixURL
    );
  }
}
