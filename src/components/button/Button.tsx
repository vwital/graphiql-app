import styles from "./button.module.scss";

const Button = ({ text }: { text: string }): React.ReactNode => {
  return <button className={styles.button}>{text}</button>;
};

export default Button;
