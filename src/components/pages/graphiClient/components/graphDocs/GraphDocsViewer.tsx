"use client";
import { RootState } from "@/app/lib/store";
import JsonViewer from "@/components/JsonViewer/JsonViewer";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import styles from "./docs.module.scss";

const GraphDocsViewer = (): React.ReactNode => {
  const t = useTranslations("GraphQL");
  const schema = useSelector((state: RootState) => state.graphClient.schema);
  if (!schema) return null;
  return (
    <div className={styles.docs}>
      <h2>{t("documentation")}</h2>
      <JsonViewer
        collapsed={4}
        response={JSON.parse(schema)}
      />
    </div>
  );
};

export default GraphDocsViewer;
