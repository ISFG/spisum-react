import { default as i18n, InitOptions, TFunction } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import {
  getI18n,
  initReactI18next,
  WithTranslation as i18nWithTranslation,
  withTranslation
} from "react-i18next";
import { ProxyProperty } from "share/utils/getPath";
import csCZ from "./dictionary/csCZ";
import lang from "./lang";
import { FALLBACK_LANG, LANGUAGES } from "./locales";

const customLangDetector = {
  name: "customLangDetector",
  lookup() {
    if (typeof navigator === "undefined" || !navigator) return FALLBACK_LANG;

    const found: string[] = [];

    if (navigator.languages) {
      navigator.languages.forEach((language) => found.push(language));
    }
    // tslint:disable-next-line:no-any
    if ((navigator as any).userLanguage) {
      // tslint:disable-next-line:no-any
      found.push((navigator as any).userLanguage);
    }

    if (navigator.language) {
      found.push(navigator.language);
    }

    let filtered: string | null = null;

    for (const f of found) {
      if (Object.keys(LANGUAGES).indexOf(f) > -1) {
        filtered = f;
        break;
      }
      const langFound = Object.keys(LANGUAGES).find(
        (x: string) =>
          x.toLowerCase() === f.toLowerCase() ||
          x.substr(0, x.indexOf("-")).toLowerCase() === f.toLowerCase()
      );
      if (langFound) {
        filtered = langFound;
        break;
      }
    }

    return filtered || FALLBACK_LANG;
  }
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(customLangDetector);

export const settings: InitOptions = {
  debug: process.env.NODE_ENV === "development" ? true : false,
  detection: {
    order: ["localStorage", "customLangDetector"]
  },
  fallbackLng: FALLBACK_LANG,
  interpolation: {
    escapeValue: false // not needed for react!!
  },
  // react i18next special options (optional)
  react: {
    bindI18n: "languageChanged loaded",
    bindStore: "added removed",
    nsMode: "default",
    wait: false
  },
  resources: {
    "cs-CZ": {
      translation: {},
      ...csCZ
    }
  }
};

i18n.on("languageChanged", () => {
  // language changed action
});

export default i18n.use(languageDetector).use(initReactI18next).init(settings);

export type TranslateFunction = TFunction;

export type WithTranslation = i18nWithTranslation;

export function t(proxy: ProxyProperty, options?: object | undefined) {
  return i18n.t(proxy.path, options);
}

export { getI18n, lang, withTranslation };

export const getLanguage = () =>
  (getI18n() && getI18n().language) || FALLBACK_LANG;
