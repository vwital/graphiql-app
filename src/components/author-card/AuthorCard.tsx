import styles from "./author-card.module.scss";
import AuthorText from "./author-text/Author-text";
import { IAuthorInfo } from "@/interfaces/interfaces";
import Image from "next/image";

const AuthorCard = ({
  src,
  text,
  className,
}: {
  src: string;
  text: IAuthorInfo;
  className: string;
}): React.ReactNode => {
  return (
    <div className={className}>
      <Image
        className={styles["author-img"]}
        src={src}
        alt="author-img"
      />
      <AuthorText authorInfo={text}></AuthorText>
    </div>
  );
};

export default AuthorCard;
