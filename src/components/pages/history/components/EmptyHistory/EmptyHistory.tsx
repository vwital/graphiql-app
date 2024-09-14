"use client";

import { RootState } from "@/app/lib/store";
import { Link } from "@/navigation";
import { useSelector } from "react-redux";
import styles from "./emptyHistory.module.scss";

const LinksList = [
  { href: "/rest", name: "REST Client" },
  { href: "/graphi", name: "GraphQL Client" },
];

const EmptyHistory = (): React.ReactNode => {
  const historyList = useSelector((state: RootState) => state.history);

  if (historyList.length) return null;

  return (
    <section>
      <h2 className={styles.history__title}>
        You haven't executed any requests. It's empty here. Try:
      </h2>
      <div className={styles.history__links}>
        {LinksList.map((link) => (
          <Link
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
