import { useTranslations } from "next-intl";
import styles from "./graphiResponse.module.scss";
import { ReactNode } from "react";

const GraphiResponse = (): ReactNode => {
  const t = useTranslations("GraphiQL");
  return (
    <>
      <h2>{t("response")}</h2>
      <p>{t("stausCode")}:</p>
      <p>{t("body")}</p>
      <div className={styles["graphi__body"]}></div>
    </>
  );
};

export default GraphiResponse;
