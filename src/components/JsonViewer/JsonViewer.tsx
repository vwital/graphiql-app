import JsonView from "@uiw/react-json-view";
import { githubLightTheme } from "@uiw/react-json-view/githubLight";
import styles from "./JsonViewer.module.scss";

const JsonViewer = ({
  response,
  collapsed = 2,
}: {
  response: object;
  collapsed?: number | boolean;
}): React.ReactNode => {
  return (
    <div className={styles.viewer}>
      <JsonView
        value={response}
        style={githubLightTheme}
        enableClipboard={false}
        indentWidth={4}
        shortenTextAfterLength={200}
        collapsed={collapsed}
      />
    </div>
  );
};

export default JsonViewer;
