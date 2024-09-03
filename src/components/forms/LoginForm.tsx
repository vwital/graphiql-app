"use client";
import { useTranslations } from "next-intl";
import styles from "./form.module.scss";
import { useForm } from "react-hook-form";
import { LoginInterface } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "./schema";
import { app } from "@/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createSession } from "@/actions/auth-actions";

const LoginForm = (): React.ReactNode => {
  const t = useTranslations("Form");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: yupResolver(schemaLogin),
    mode: "onChange",
  });

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      const { expirationTime } = await user.getIdTokenResult(false);
      const expirationTimestamp = Date.parse(expirationTime);
      await createSession(expirationTimestamp.toString(), user.displayName);
    } catch (error) {
      alert("Something went wrong" + error);
    }
  };

  const submitForm = (data: LoginInterface): void => {
    const { email, password } = data;
    handleLogin(email, password);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitForm)}
    >
      <label className={styles.form__label}>{t("email")}</label>
      <input
        className={styles.form__input}
        type="text"
        placeholder={t("email")}
        {...register("email")}
      />
      {errors.email && (
        <p className={styles.form__error}>{t(errors.email.message)}</p>
      )}
      <label className={styles.form__label}>{t("password")}</label>
      <input
        className={styles.form__input}
        type="password"
        placeholder={t("password")}
        {...register("password")}
      />
      {errors.password && (
        <p className={styles.form__error}>{t(errors.password.message)}</p>
      )}
      <button
        className={styles.form__button}
        type="submit"
      >
        {t("submit")}
      </button>
    </form>
  );
};

export default LoginForm;
