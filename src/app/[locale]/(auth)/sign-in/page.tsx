"use client";
import { useTranslations } from "next-intl";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "@/components/form/Form";
import { app } from "@/firebase";
import styles from "../sign.module.scss";

const SignInPage = (): React.ReactNode => {
  const t = useTranslations("SignInPage");

  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password).then().catch();
  };

  return (
    <div className={styles["sign-container"]}>
      <div className={styles["sign-block"]}>
        <h2>{t("signIn")}</h2>
        <div>
          <Form handleClick={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
