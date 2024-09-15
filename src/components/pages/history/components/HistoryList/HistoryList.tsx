"use client";

import { Link } from "@/navigation";
import { HistoryItem } from "../../types";
import styles from "./historyList.module.scss";
import { useTranslations } from "next-intl";

const HistoryList = ({
  historyList,
}: {
  historyList: HistoryItem[];
}): React.ReactNode => {
  const t = useTranslations("HistoryPage");
  return (
    <>
      <h2 className={styles.history__title}>{t("historyRequestTitle")}</h2>
      <div className={styles.history__container}>
        {historyList.map((item, index) => (
          <div
            className={styles.history__wrapper}
            key={index}
          >
            <span className={styles.history__number}>#{index + 1}</span>
            <Link
              className={`${styles.history__link} link`}
              href={item.href}
            >
              <span className={styles.history__method}>{item.method}</span>
              <span className={styles.history__url}>{item.url}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default HistoryList;
