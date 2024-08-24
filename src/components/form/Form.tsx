"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import styles from "./form.module.scss";

interface FormProps {
  handleClick: (email: string, password: string) => void;
}

const Form = ({ handleClick }: FormProps): React.ReactNode => {
  const t = useTranslations("Form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles["form-container"]}>
      <label>{t("email")}</label>
      <input
        type="email"
        placeholder={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>{t("password")}</label>
      <input
        type="password"
        placeholder={t("password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => handleClick(email, password)}
        type="button"
      >
        {t("submit")}
      </button>
    </div>
  );
};

export default Form;
