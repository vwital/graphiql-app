"use client";
import { useTranslations } from "next-intl";
import styles from "../sign.module.scss";
import RegForm from "@/components/forms/RegForm";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { useRouter } from "@/navigation";

const SingUpPage = (): React.ReactNode => {
  const t = useTranslations("SignUpPage");
  const router = useRouter();
  const { isAuth } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (isAuth) {
      router.replace("/");
    } else {
      setIsCheckingAuth(false);
    }
  }, [isAuth, router]);

  if (isCheckingAuth) {
    return <div>{t("loading")}</div>;
  }

  return isAuth ? null : (
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
