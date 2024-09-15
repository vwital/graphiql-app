"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./styles.module.scss";

const ErrorPageLocale = ({ error }: { error: Error }): JSX.Element => {
  const t = useTranslations("ErrorPage");

  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorPage__title}>{t("errorHeader")}</h1>
      <h2 className={styles.errorPage__subtitle}>{t("errorMessage")}</h2>

      <p className={styles.errorPage__text}>
        {t("error")}: {error.message}
      </p>

      <Link
        href="/"
        className="button"
      >
        {t("errorButton")}
      </Link>
    </div>
  );
};

export default ErrorPageLocale;
