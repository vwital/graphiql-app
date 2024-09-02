"use client";
import { useAuth } from "@/hooks/useAuth";
import WelcomeMessage from "@/components/welcomeMessage/WelcomeMessage";
import ActionButtons from "@/components/actionButtons/ActionButtons";
import AuthorsSection from "@/components/authorsSection/AuthorsSection";
import styles from "./styles.module.scss";

const WelcomePage = (): React.ReactNode => {
  const { isAuth } = useAuth();
  return (
    <div className={styles.welcome}>
      <div className={styles.welcome__wrapper}>
        <WelcomeMessage isAuth={isAuth} />
        <ActionButtons isAuth={isAuth} />
        <AuthorsSection />
      </div>
    </div>
  );
};

export default WelcomePage;
