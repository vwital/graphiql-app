import { GithubLogo } from "../../elements/GithubLogo";
import { RSSchoolLogo } from "../../elements/RSSchoolLogo";
import styles from "./footer.module.scss";

const Footer = (): React.ReactNode => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <a
          className={`${styles.footer__link} ${styles.footer__link_github}`}
          href="https://github.com/vwital/graphiql-app"
        >
          <GithubLogo />
        </a>
        <span>&copy;2024</span>
        <a
          className={`${styles.footer__link} ${styles.footer__link_rsschool}`}
          href="https://rs.school/courses/reactjs"
        >
          <RSSchoolLogo />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
