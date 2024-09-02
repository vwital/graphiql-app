"use client";
import { useTranslations } from "next-intl";
import styles from "./actionButtons.module.scss";
import { Link } from "@/navigation";

const ActionButtons = ({ isAuth }: { isAuth: boolean }): React.ReactNode => {
  const t = useTranslations("Main");

  return (
    <div className={styles.welcome__buttons}>
      {isAuth ? (
        <>
          <button className="button">
            <Link href="/rest">{t("rest")}</Link>
          </button>
          <button className="button">
            <Link href="/graphi">{t("graphiql")}</Link>
          </button>
          <button className="button">
            <Link href="/history">{t("history")}</Link>
          </button>
        </>
      ) : (
        <>
          <button className="button">
            <Link href="/sign-in">{t("signIn")}</Link>
          </button>
          <button className="button">
            <Link href="/sign-up">{t("signUp")}</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
