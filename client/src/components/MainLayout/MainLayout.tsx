import { Outlet } from "react-router-dom";
import styles from "./styles.module.css";
import { FC, ReactNode } from "react";

export const MainLayout: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className={styles["main-layout-root"]}>{children ?? <Outlet />}</div>
  );
};
