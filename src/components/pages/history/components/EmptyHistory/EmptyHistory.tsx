"use client";

import { Link } from "@/navigation";
import styles from "./emptyHistory.module.scss";
import { useTranslations } from "next-intl";

const LinksList = [
  { href: "/rest", name: "REST Client" },
  { href: "/graphi", name: "GraphQL Client" },
];

const EmptyHistory = (): React.ReactNode => {
  const t = useTranslations("HistoryPage");

  return (
    <section>
      <h2 className={styles.history__title}>{t("historyEmptyTitle")}</h2>
      <div className={styles.history__links}>
        {LinksList.map((link, index) => (
          <Link
            key={index}
            className={styles.history__link}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EmptyHistory;
