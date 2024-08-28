import { useTranslations } from "next-intl";
import styles from "./response.module.scss";
const RestResponse = (): React.ReactNode => {
  const t = useTranslations("RestClientPage");

  return (
    <section className={styles.response__wrapper}>
      <h2>{t("response")}</h2>
      <div className={styles.response}>
        <p className={styles.response__text}>
          {t("statusCode")}: <span>{`${200}`}</span>
        </p>
        <label htmlFor="response">{t("body")}</label>
        <textarea
          className="textarea"
          name="response"
          id="response"
          readOnly
          value={`{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}`}
          cols={30}
          rows={10}
        />
      </div>
    </section>
  );
};

export default RestResponse;
