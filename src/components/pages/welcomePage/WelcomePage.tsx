import WelcomeMessage from "@/components/pages/welcomePage/components/welcomeMessage/WelcomeMessage";
import ActionButtons from "@/components/pages/welcomePage/components/actionButtons/ActionButtons";
import AuthorsSection from "@/components/pages/welcomePage/components/authorsSection/AuthorsSection";
import styles from "./styles.module.scss";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE_DISPLAY_NAME,
  SESSION_COOKIE_NAME,
} from "@/constants/constants";

const WelcomePage = (): React.ReactNode => {
  const isAuth = Boolean(cookies().get(SESSION_COOKIE_NAME)?.value || null);
  const userName = cookies().get(SESSION_COOKIE_DISPLAY_NAME)?.value || null;

  return (
    <div className={styles.welcome}>
      <div className={styles.welcome__wrapper}>
        <WelcomeMessage
          isAuth={isAuth}
          userName={userName}
        />
        <ActionButtons isAuth={isAuth} />
        <AuthorsSection />
      </div>
    </div>
  );
};

export default WelcomePage;
