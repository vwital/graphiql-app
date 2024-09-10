import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";
import styles from "./styles.module.scss";

const JsonViewer = ({ response }: { response: object }): React.ReactNode => {
  return (
    <div className={styles.viewer}>
      <JsonView
        value={response}
        style={githubLightTheme}
        enableClipboard={false}
        indentWidth={4}
        shortenTextAfterLength={200}
      />
    </div>
  );
};

export default JsonViewer;
