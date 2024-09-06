import React from "react";
import styles from "./graphiResponse.module.scss";
import { useTranslations } from "next-intl";

interface ResponseProps {
  status: number;
  body: object;
}

const GraphiResponse = ({ status, body }: ResponseProps): React.ReactNode => {
  const t = useTranslations("GraphiQL");

  return (
    <div className={styles.responseSection}>
      <h2>{t("response")}</h2>
      <p>
        {t("statusCode")}: {status}
      </p>
      <pre>{JSON.stringify(body, null, 2)}</pre>
    </div>
  );
};

export default GraphiResponse;
