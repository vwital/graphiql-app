"use client";
import { useTranslations } from "next-intl";
import styles from "../sign.module.scss";
import RegForm from "@/components/forms/RegForm";

const SingUpPage = (): React.ReactNode => {
  const t = useTranslations("SignUpPage");

  return (
    <div className={styles.sign}>
      <div className={styles.sign__block}>
        <h2>{t("signUp")}</h2>
        <div>
          <RegForm />
        </div>
      </div>
    </div>
  );
};

export default SingUpPage;
