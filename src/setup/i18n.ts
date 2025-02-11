import i18n from "i18next";
import localeCode from "locale-code";
import { initReactI18next } from "react-i18next";

import { locales } from "@/assets/languages";

// Languages
const langCodes = Object.keys(locales);
const resources = Object.fromEntries(
  Object.entries(locales).map((entry) => [entry[0], { translation: entry[1] }]),
);
i18n.use(initReactI18next).init({
  fallbackLng: "en",
  resources,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

const extraLanguages: Record<
  string,
  {
    code: string;
    name: string;
    nativeName: string;
  }
> = {
  pirate: {
    code: "pirate",
    name: "Pirate",
    nativeName: "Pirate Tongue",
  },
  minion: {
    code: "minion",
    name: "Minion",
    nativeName: "Minionese",
  },
  tok: {
    code: "tok",
    name: "Toki pona",
    nativeName: "Toki pona",
  },
};

type LanguageOption = {
  code: string;
  name: string;
  nativeName: string;
};

export const appLanguageOptions: LanguageOption[] = langCodes.map((lang) => {
  const extraLang = extraLanguages[lang];
  if (extraLang) return extraLang;

  const langObj: LanguageOption = {
    code: lang,
    name: localeCode.getLanguageName(lang),
    nativeName: localeCode.getLanguageNativeName(lang),
  };

  if (!langObj)
    throw new Error(`Language with code ${lang} cannot be found in database`);
  return langObj;
});

export default i18n;
