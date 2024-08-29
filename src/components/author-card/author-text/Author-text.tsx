import { IAuthorInfo } from "@/interfaces/interfaces";
import { useTranslations } from "next-intl";
import styles from "./../author-card.module.scss";

const AuthorText = ({
  authorInfo,
}: {
  authorInfo: IAuthorInfo;
}): React.ReactNode => {
  const t = useTranslations("Author");
  return (
    <div className={styles.author__text}>
      const {authorInfo.nickname} = {"{"}
      <pre>
        {t("name")}: {authorInfo.name}
      </pre>
      <pre>
        {t("role")}: {authorInfo.role}
      </pre>
      <pre>
        {t("bio")}: {authorInfo.bio}
      </pre>
      <pre>
        {"github"}:{" "}
        <a
          className={styles.author__link + " link"}
          href={authorInfo.github}
          target="_blank"
        >
          {authorInfo.github}
        </a>
      </pre>
    </div>
  );
};

export default AuthorText;
