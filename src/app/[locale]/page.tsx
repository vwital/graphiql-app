import { useTranslations } from "next-intl";
import styles from "./main-page.module.scss";
import AuthorsSlider from "@/components/authors-slider/AuthorsSlider";

const RootPage = (): React.ReactNode => {
  const t = useTranslations("Main");

  return (
    <div className={styles["welcome-page"]}>
      <h2>{t("welcome")}</h2>
      <p className={styles["welcome-text"]}>{t("description")} </p>
      <div className={styles["welcome-buttons"]}>
        <button>{t("signIn")}</button>
        <button>{t("signUp")}</button>
      </div>
      <h2>{t("authors")}</h2>
      <AuthorsSlider />
      <h2>{t("aboutCourse")}</h2>
      <p className={styles["welcome-text"]}>{t("courseDescription")}</p>
      <p>
        <a href="https://rs.school/courses/reactjs">
          https://rs.school/courses/reactjs
        </a>
      </p>
    </div>
  );
};

export default RootPage;
