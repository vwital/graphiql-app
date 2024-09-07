import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import styles from "./styles.module.scss";

const NotFoundLocale = (): React.ReactNode => {
  const t = useTranslations("NotFoundPage");
  return (
    <div className={styles["not-found"]}>
      <h1 className={styles["not-found__title"]}>404</h1>
      <h2 className={styles["not-found__subtitle"]}>{t("notFound")}</h2>
      <p className={styles["not-found__text"]}>{t("notFoundText")}</p>
      <Link
        className="button"
        href="/"
      >
        {t("mainPage")}
      </Link>
    </div>
  );
};

export default NotFoundLocale;
