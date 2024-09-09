"use client";
import { useTranslations } from "next-intl";
import styles from "./response.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";
const RestResponse = (): React.ReactNode => {
  const t = useTranslations("RestClientPage");
  const [response] = useSelector((state: RootState) => state.restClient);

  return response ? (
    <section className={styles.response__wrapper}>
      <h2>{t("response")}</h2>
      <div className={styles.response}>
        <span className={styles.response__text}>
          {t("statusCode")}: {response.statusCode ?? 0}
        </span>
        <span>{t("body")}</span>
        <div className={styles.response__viewer}>
          <JsonView
            value={response.dataFromResponse}
            style={githubLightTheme}
            enableClipboard={false}
            indentWidth={4}
            shortenTextAfterLength={200}
          />
        </div>
      </div>
    </section>
  ) : null;
};

export default RestResponse;
