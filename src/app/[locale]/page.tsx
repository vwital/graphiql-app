"use client";
import { useTranslations } from "next-intl";
import AuthorsSlider from "@/components/authors-slider/AuthorsSlider";
import { Link } from "@/navigation";
import styles from "./main-page.module.scss";

const RootPage = (): React.ReactNode => {
  const t = useTranslations("Main");

  return (
    <div className={styles["welcome"]}>
      <h2>{t("welcome")}</h2>
      <p className={styles["welcome__text"]}>{t("description")} </p>
      <div className={styles["welcome__buttons"]}>
        <button>
          <Link href="/">{t("signIn")}</Link>
        </button>
        <button>
          <Link href="/">{t("signUp")}</Link>
        </button>
      </div>
      <h2>{t("authors")}</h2>
      <AuthorsSlider />
      <h2>{t("aboutCourse")}</h2>
      <p className={styles["welcome__text"]}>{t("courseDescription")}</p>
      <p className={styles["welcome__link"]}>
        <a href="https://rs.school/courses/reactjs">
          https://rs.school/courses/reactjs
        </a>
      </p>
    </div>
  );
};

export default RootPage;
