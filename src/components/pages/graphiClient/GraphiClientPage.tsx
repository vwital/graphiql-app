import React from "react";
import GraphDocsViewer from "./components/graphDocs/GraphDocsViewer";
import styles from "./graph.module.scss";
import GraphForm from "./components/graphiForm/GraphiForm";

const GraphiClientPage = (): React.ReactNode => {
  return (
    <section className={styles.graphClient}>
      <GraphForm />
      <GraphDocsViewer />
    </section>
  );
};

export default GraphiClientPage;
