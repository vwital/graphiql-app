import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

const NotFoundGeneral = (): React.ReactNode => {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.notFound__title}>404</h1>
      <h2 className={styles.notFound__subtitle}>Page not found</h2>
      <p className={styles.notFound__text}>
        Oops! The page you are looking for does not exist
      </p>
      <Link
        className={styles.notFound__link}
        href="/"
      >
        Go to main page
      </Link>
    </div>
  );
};

export default NotFoundGeneral;
