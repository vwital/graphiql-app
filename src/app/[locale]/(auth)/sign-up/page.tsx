"use client";
import Form from "@/components/form/Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useTranslations } from "next-intl";
import { app } from "@/firebase";
const SingUpPage = (): React.ReactNode => {
  const t = useTranslations("SignUpPage");

  const handleRegister = (email: string, password: string): void => {
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password).then().catch();
  };

  return (
    <div>
      <h2>{t("signUp")}</h2>
      <Form handleClick={handleRegister} />
    </div>
  );
};

export default SingUpPage;
