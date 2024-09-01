"use client";
import { useTranslations } from "next-intl";
import styles from "../sign.module.scss";
import LoginForm from "@/components/forms/LoginForm";
import { useRouter } from "@/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const SignInPage = (): React.ReactNode => {
  const t = useTranslations("SignInPage");
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
        <h2>{t("signIn")}</h2>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
