import { Link } from "@/navigation";
import styles from "./styles.module.scss";
import { useTranslations } from "next-intl";
import AuthorsSlider from "@/components/authors-slider/AuthorsSlider";

const WelcomePage = (): React.ReactNode => {
  const t = useTranslations("Main");

  return (
    <div className={styles.welcome}>
      <div className={styles.welcome__wrapper}>
        <h2>{t("welcome")}</h2>
        <p className={styles.welcome__text}>{t("description")} </p>
        <div className={styles.welcome__buttons}>
          <button className="button">
            <Link href="/sign-in">{t("signIn")}</Link>
          </button>
          <button className="button">
            <Link href="/sign-up">{t("signUp")}</Link>
          </button>
        </div>
        <h2>{t("authors")}</h2>
        <AuthorsSlider />
        <h2>{t("aboutCourse")}</h2>
        <p className={styles.welcome__text}>{t("courseDescription")}</p>
        <a
          className={styles.welcome__link + " link"}
          href="https://rs.school/courses/reactjs"
        >
          https://rs.school/courses/reactjs
        </a>
      </div>
    </div>
  );
};

export default WelcomePage;
