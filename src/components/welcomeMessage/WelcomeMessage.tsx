"use client";
import { useTranslations } from "next-intl";
import styles from "./welcomeMessage.module.scss";
import { useAuth } from "@/hooks/useAuth";

interface WelcomeMessageProps {
  isAuth: boolean;
  userName?: string | null;
}

const WelcomeMessage = ({ isAuth }: WelcomeMessageProps): React.ReactNode => {
  const t = useTranslations("Main");
  const { userName } = useAuth();

  return (
    <>
      <h2>{isAuth ? `${t("welcome-back")}, ${userName}` : t("welcome")}</h2>
      <p className={styles.welcome__text}>{t("description")}</p>
    </>
  );
};

export default WelcomeMessage;
