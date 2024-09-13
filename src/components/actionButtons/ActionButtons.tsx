import { useTranslations } from "next-intl";
import styles from "./actionButtons.module.scss";
import { Link } from "@/navigation";

const ActionButtons = ({ isAuth }: { isAuth: boolean }): React.ReactNode => {
  const t = useTranslations("Main");

  const links = isAuth
    ? [
        { href: "/rest", text: t("rest") },
        { href: "/graphi", text: t("graphiql") },
        { href: "/history", text: t("history") },
      ]
    : [
        { href: "/sign-in", text: t("signIn") },
        { href: "/sign-up", text: t("signUp") },
      ];

  return (
    <div className={styles.welcome__buttons}>
      {links.map((link, index) => (
        <Link
          key={index}
          className="button"
          href={link.href}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

export default ActionButtons;
