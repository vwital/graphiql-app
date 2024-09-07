import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

const NotFoundGeneral = (): React.ReactNode => {
  return (
    <div className={styles["not-found"]}>
      <h1 className={styles["not-found__title"]}>404</h1>
      <h2 className={styles["not-found__subtitle"]}>Page not found</h2>
      <p className={styles["not-found__text"]}>
        Oops! The page you are looking for does not exist
      </p>
      <Link
        className="button"
        href="/"
      >
        Go to main page
      </Link>
    </div>
  );
};

export default NotFoundGeneral;
