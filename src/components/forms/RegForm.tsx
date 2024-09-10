"use client";
import { useTranslations } from "next-intl";
import styles from "./form.module.scss";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "@/firebase";
import { RegInterface } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { schemaReg } from "./schema";
import { createSession } from "@/actions/auth-actions";

const RegForm = (): React.ReactNode => {
  const t = useTranslations("Form");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegInterface>({
    resolver: yupResolver(schemaReg),
    mode: "onChange",
  });

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      await updateProfile(auth.currentUser!, { displayName: username });
      const { expirationTime } = await user.getIdTokenResult(false);
      const expirationTimestamp = Date.parse(expirationTime);
      await createSession(expirationTimestamp.toString(), user.displayName);
    } catch (error) {
      alert("Something went wrong " + error);
    }
  };

  const submitForm = (data: RegInterface): void => {
    const { username, email, password } = data;
    handleRegister(username, email, password);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitForm)}
    >
      <label className={styles.form__label}>{t("username")}</label>
      <input
        className={styles.form__input}
        type="text"
        placeholder={t("username")}
        {...register("username")}
      />
      {errors.username && (
        <p className={styles.form__error}>{t(errors.username.message)}</p>
      )}
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

export default RegForm;
