import { useTranslations } from "next-intl";
import styles from "./graphi-page.module.scss";

const GraphiQlClientPage = (): React.ReactNode => {
  const t = useTranslations("GraphiQL");
  return (
    <div className={styles["graphi"]}>
      <div className={styles["wrapper"]}>
        <h2>{t("header")}</h2>
        <label htmlFor="endpoint">{t("endpoint")}</label>
        <input
          className="input"
          type="text"
          name="endpoint"
          id="endpoint"
          placeholder="URL"
        />
        <label htmlFor="endpoint">SDL URL</label>
        <input
          className="input"
          type="text"
          name="endpoint"
          id="endpoint"
          placeholder="URL"
        />
        <div className={styles["graphi__headers"]}>
          <p>{t("headers")}</p>
          <div className={styles["graphi__headers-forms"]}>
            <input
              className="input"
              type="text"
              name="endpoint"
              id="endpoint"
              placeholder={t("key")}
            />

            <input
              className="input"
              type="text"
              name="endpoint"
              id="endpoint"
              placeholder={t("value")}
            />
          </div>
        </div>
        <button className="button">{t("addHeader")}</button>
        <div className={styles["graphi__query"]}>
          <label htmlFor="endpoint">{t("query")}</label>
          <textarea
            className="input"
            name="endpoint"
            id="endpoint"
            placeholder=""
            rows={5}
          />
          <label htmlFor="endpoint">{t("variables")}</label>
          <textarea
            className="input"
            name="endpoint"
            id="endpoint"
            placeholder=""
            rows={5}
          />
          <button className="button">Send</button>
        </div>
        <h2>{t("response")}</h2>
        <p>{t("stausCode")}:</p>
        <p>{t("body")}</p>
        <div className={styles["graphi__body"]}></div>
        <p>{t("documentation")}</p>
        <div className={styles["graphi__documentation"]}></div>
      </div>
    </div>
  );
};

export default GraphiQlClientPage;
