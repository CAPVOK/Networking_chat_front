import { Link } from "react-router-dom";
import { RoutesEnum } from "../../app/Routes";
import styles from "./styles.module.css";

export const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      <Link to={RoutesEnum.Home}>На главную</Link>
    </div>
  );
};
