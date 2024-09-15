"use client";

import { useTranslations } from "next-intl";
import styles from "./styles.module.scss";

const LoadingPageLocale = (): JSX.Element => {
  const t = useTranslations("Loading");

  return (
    <div className={styles.loading}>
      <h1 className={styles.loading__title}>{t("loadingText")}</h1>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingPageLocale;
