"use client";
import Form from "@/components/form/Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useTranslations } from "next-intl";
import { app } from "@/firebase";
import styles from "../sign.module.scss";

const SingUpPage = (): React.ReactNode => {
  const t = useTranslations("SignUpPage");

  const handleRegister = (email: string, password: string): void => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password).then().catch();
  };

  return (
    <div className={styles.sign}>
      <div className={styles.sign__block}>
        <h2>{t("signUp")}</h2>
        <div>
          <Form handleClick={handleRegister} />
        </div>
      </div>
    </div>
  );
};

export default SingUpPage;
