"use client";

import { Link } from "@/navigation";
import styles from "./emptyHistory.module.scss";

const LinksList = [
  { href: "/rest", name: "REST Client" },
  { href: "/graphi", name: "GraphQL Client" },
];

const EmptyHistory = (): React.ReactNode => {
  return (
    <section>
      <h2 className={styles.history__title}>
        You haven't executed any requests. It's empty here. Try:
      </h2>
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
