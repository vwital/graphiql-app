"use client";
import { useTranslations } from "next-intl";
import styles from "./response.module.scss";
// import { useSelector } from "react-redux";
// import { RootState } from "@/app/lib/store";
import { useParams } from "next/navigation";
// import JsonViewer from "@/components/JsonViewer/JsonViewer";

const RestResponse = (): React.ReactNode => {
  const t = useTranslations("RestClientPage");
  // const [response] = useSelector((state: RootState) => state.restClient);
  const params = useParams();
  if (!params.requestUrl) return null;

  return response ? (
    <section className={styles.response__wrapper}>
      <h2>{t("response")}</h2>
      <div className={styles.response}>
        <span className={styles.response__text}>
          {t("statusCode")}: {response.statusCode ?? 0}
        </span>
        <span>{t("body")}</span>
        <JsonViewer response={response.dataFromResponse} />
      </div>
    </section>
  ) : null;
};

export default RestResponse;
