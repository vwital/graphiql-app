"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import styles from "./styles.module.scss";

const ErrorPageLocale = ({ error }: { error: Error }): JSX.Element => {
  const t = useTranslations("ErrorPage");

  return (
    <div className={styles["error-page"]}>
      <h1 className={styles["error-page__title"]}>{t("errorHeader")}</h1>
      <h2 className={styles["error-page__subtitle"]}>{t("errorMessage")}</h2>

      <p className={styles["error-page__text"]}>
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
