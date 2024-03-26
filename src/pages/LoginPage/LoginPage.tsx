import {  useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authSlice";
import { RoutesEnum } from "../../app/Routes";
import styles from "./styles.module.css";


export const LoginPage = () => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLoginClick = () => {
    login("Vova");
    navigate(RoutesEnum.Home);
  };
  return (
    <div className={styles.page}>
      <h1>LoginPage</h1>
      <button onClick={handleLoginClick}>Войти</button>
    </div>
  );
};
