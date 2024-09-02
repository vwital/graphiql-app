"use client";

import styles from "./header.module.scss";
import { useLayoutEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import LocaleSwitcherButton from "../elements/LocaleSwitcherButton";
import { useAuth } from "@/hooks/useAuth";

const Header = (): React.ReactNode => {
  const [isSticky, setIsSticky] = useState(false);
  const { isAuth, logOut } = useAuth();
  const t = useTranslations("Header");

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
          <h1>
            <Link href={"/"}>REST/GraphiQL Client</Link>
          </h1>
          <div className={styles.header__controls}>
            <LocaleSwitcherButton />
            <div className={styles.header__links}>
              {isAuth ? (
                <>
                  <Link href={"/"}>{t("mainPage")}</Link>
                  <button
                    className={styles.header__logout}
                    onClick={logOut}
                  >
                    {t("logout")}
                  </button>
                </>
              ) : (
                <>
                  <Link href={"/sign-in"}>{t("login")}</Link>
                  <Link href={"/sign-up"}>{t("register")}</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
