import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./styles.module.scss";

const NotFoundLocale = (): React.ReactNode => {
  const t = useTranslations("NotFoundPage");
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>404</h1>
      <h2 className={styles.notFound__subtitle}>{t("notFound")}</h2>
      <p className={styles.notFound__text}>{t("notFoundText")}</p>
      <Link
        className={styles.notFound__link}
        href="/"
      >
        {t("mainPage")}
      </Link>
    </div>
  );
};

export default NotFoundLocale;
