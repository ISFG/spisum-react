interface Languages {
  [s: string]: LanguageSetting;
}

export interface LanguageSetting {
  FIRST_DAY: number;
  label: string;
}

export const FALLBACK_LANG = "cs-CZ";

export const LANGUAGES: Languages = {
  "cs-CZ": {
    FIRST_DAY: 1,
    label: "Česky"
  }
};
