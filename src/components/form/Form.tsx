"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./form.module.scss";

interface FormProps {
  handleClick: (username: string, email: string, password: string) => void;
  signUp?: boolean;
}

const Form = ({ handleClick, signUp = false }: FormProps): React.ReactNode => {
  const t = useTranslations("Form");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.form}>
      {signUp && <label className={styles.form__label}>{t("username")}</label>}
      {signUp && (
        <input
          className={styles.form__input}
          type="text"
          placeholder={t("username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
      <label className={styles.form__label}>{t("email")}</label>
      <input
        className={styles.form__input}
        type="text"
        placeholder={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className={styles.form__label}>{t("password")}</label>
      <input
        className={styles.form__input}
        type="password"
        placeholder={t("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={styles.form__button}
        onClick={() => handleClick(username, email, password)}
        type="button"
      >
        {t("submit")}
      </button>
    </div>
  );
};

export default Form;
