"use client";

import Link from "next/link";
import styles from "./header.module.scss";
import { useLayoutEffect, useState } from "react";

const Header = (): React.ReactNode => {
  const [isSticky, setIsSticky] = useState(false);

  const setSticked = (): void => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", setSticked);
    return (): void => window.removeEventListener("scroll", setSticked);
  }, []);

  return (
    <>
      <header
        className={`${styles.header} ${isSticky ? `${styles.header_sticky}` : null}`}
      >
        <div className={styles.header__wrapper}>
          <h1>REST/GraphiQL Client</h1>
          <div className={styles.header__controls}>
            <button type="button">en</button>
            <div className={styles.header__links}>
              <Link href={"/sign-in"}>login</Link>
              <Link href={"/sign-up"}>register</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
