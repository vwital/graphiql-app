import AuthorCard from "@/components/author-card/Author-card";
import Button from "@/components/button/Button";
import styles from "./main-page.module.scss";

interface AuthorInfo {
  nickname: string;
  name: string;
  role: string;
  bio: string;
  github: string;
}
const text: AuthorInfo = {
  nickname: "vwital",
  name: " Vital Ilyuchyk",
  role: "Developer ,Team Lead,",
  bio: "Master in Ecology, School Teacher, Junior Frontend Developer",
  github: "https://github.com/vwital ",
};

const RootPage = (): React.ReactNode => {
  return (
    <div className={styles["welcome-page"]}>
      <h2>Welcome</h2>
      <p>
        This application combines the functionality of REST and GraphiQL client.
        Created as part of the final task of the RS School React course
      </p>
      <Button text="Login"></Button>
      <Button text="Register"></Button>
      <h2>Authors</h2>
      <AuthorCard
        src="./icon.svg"
        text={text}
      ></AuthorCard>
      <h2>About cource</h2>
    </div>
  );
};

export default RootPage;
