"use client";

import styles from "./header.module.scss";
import { useLayoutEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useAuth } from "@/hooks/useAuth";
import LocaleSwitcherButton from "@/components/elements/localeSwitcher/LocaleSwitcherButton";
import { NOT_AUTH_LINKS, STICKY_SCROLL } from "./constants";

const Header = ({ session }: { session: string | null }): React.ReactNode => {
  const [isSticky, setIsSticky] = useState(false);
  const { logOut } = useAuth();
  const t = useTranslations("Header");

  const setSticked = (): void => {
    setIsSticky(window.scrollY > STICKY_SCROLL);
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
            <Link href={"/"}>REST/GraphQL Client</Link>
          </h1>
          <div className={styles.header__controls}>
            <LocaleSwitcherButton />
            <div className={styles.header__links}>
              {session ? (
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
                  {NOT_AUTH_LINKS.map((link) => (
                    <Link
                      className={`${styles.header__link} link`}
                      key={link.name}
                      href={link.href}
                    >
                      {link.name}
                    </Link>
                  ))}
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
