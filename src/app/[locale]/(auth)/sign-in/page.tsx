"use client";
import { useTranslations } from "next-intl";
import styles from "../sign.module.scss";
import LoginForm from "@/components/forms/LoginForm";

const SignInPage = (): React.ReactNode => {
  const t = useTranslations("SignInPage");

  return (
    <div className={styles.sign}>
      <div className={styles.sign__block}>
        <h2>{t("signIn")}</h2>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
