"use client";
import { useTranslations } from "next-intl";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "@/components/form/Form";
import { app } from "@/firebase";

const SignInPage = (): React.ReactNode => {
  const t = useTranslations("SignInPage");

  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password).then().catch();
  };

  return (
    <div>
      <h2>{t("signIn")}</h2>
      <Form handleClick={handleLogin} />
    </div>
  );
};

export default SignInPage;
