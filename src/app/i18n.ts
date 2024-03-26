import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import RU from "../translation/rus.json";
import EN from "../translation/en.json";

export enum LanguageEnum {
  Eng = "en",
  Rus = "ru",
}

const resources: Record<LanguageEnum, Resource> = {
  [LanguageEnum.Eng]: { translation: EN },
  [LanguageEnum.Rus]: { translation: RU },
};

/**
 * Функция для получения языка из localStorage
 * @returns Язык из localStorage или "ru", если язык не установлен или недопустим
 */
const getLanguageFromLocalStorage = (): LanguageEnum => {
  const storedLanguage = localStorage.getItem("language");
  if (
    storedLanguage &&
    Object.values(LanguageEnum).includes(storedLanguage as LanguageEnum)
  ) {
    return storedLanguage as LanguageEnum;
  }
  return LanguageEnum.Rus;
};

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: getLanguageFromLocalStorage(),
  interpolation: {
    escapeValue: false,
  },
  resources: resources,
});

/**
 * Функция для изменения языка
 * @param language Новый язык, который следует установить
 */
export const changeLanguage = (language: LanguageEnum): void => {
  i18n.changeLanguage(language);
  localStorage.setItem("language", language);
};

export default i18n;
