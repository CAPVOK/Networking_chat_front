import { useTheme } from "../../hooks/useTheme";
import styles from "./styles.module.css";

export const MainPage = () => {
  const { toggleTheme } = useTheme();
  return (
    <div className={styles.page}>
      <h1>Main Page</h1>
      <button onClick={toggleTheme}>theme</button>
    </div>
  );
};
