"use client";

import { usePathname, useRouter } from "@/navigation";
import { useParams } from "next/navigation";
import styles from "./switcher.module.scss";

const LocaleSwitcherButton = (): React.ReactNode => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const onChangeLocale = (): void => {
    const nextLocale = params.locale === "en" ? "ru" : "en";
    router.replace({ pathname }, { locale: nextLocale });
  };

  return (
    <div>
      <button
        className={styles["locate-switch"]}
        onClick={onChangeLocale}
        type="button"
      >
        {params.locale}
      </button>
    </div>
  );
};

export default LocaleSwitcherButton;
