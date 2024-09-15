import { useTranslations } from "next-intl";
import AuthorsSlider from "../authors-slider/AuthorsSlider";
import styles from "./authorsSection.module.scss";

const AuthorsSection = (): React.ReactNode => {
  const t = useTranslations("Main");

  return (
    <>
      <h2 className={styles.welcome__title}>{t("authors")}</h2>
      <AuthorsSlider />
      <h2 className={styles.welcome__title}>{t("aboutCourse")}</h2>
      <p className={styles.welcome__text}>{t("courseDescription")}</p>
      <a
        className={styles.welcome__link + " link"}
        href="https://rs.school/courses/reactjs"
      >
        https://rs.school/courses/reactjs
      </a>
    </>
  );
};

export default AuthorsSection;
