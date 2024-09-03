import { useTranslations } from "next-intl";
import styles from "./welcomeMessage.module.scss";

interface WelcomeMessageProps {
  isAuth: boolean | null;
  userName?: string | null;
}

const WelcomeMessage = ({
  isAuth,
  userName,
}: WelcomeMessageProps): React.ReactNode => {
  const t = useTranslations("Main");

  return (
    <>
      <h2>{isAuth ? `${t("welcome-back")}, ${userName}` : t("welcome")}</h2>
      <p className={styles.welcome__text}>{t("description")}</p>
    </>
  );
};

export default WelcomeMessage;
