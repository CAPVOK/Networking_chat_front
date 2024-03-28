import { setLanguage } from "../../app/i18n";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { LanguageEnum } from "../../app/i18n";

export const MainPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.page}>
      <h1>Main Page</h1>
      <p>{t("common.PrivacyPolicy")}</p>
      <button onClick={() => setLanguage(LanguageEnum.Rus)}>theme</button>
      <button onClick={() => setLanguage(LanguageEnum.Eng)}>theme</button>
    </div>
  );
};
