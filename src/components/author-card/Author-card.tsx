import styles from "./author-card.module.scss";
import AuthorText from "./author-text/Author-text";
interface AuthorInfo {
  nickname: string;
  name: string;
  role: string;
  bio: string;
  github: string;
}

const AuthorCard = ({
  src,
  text,
}: {
  src: string;
  text: AuthorInfo;
}): React.ReactNode => {
  return (
    <div className={styles["author-card"]}>
      <img
        className={styles["author-img"]}
        src={src}
        alt="author-img"
      />
      <AuthorText authorInfo={text}></AuthorText>
    </div>
  );
};

export default AuthorCard;
