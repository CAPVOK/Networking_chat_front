import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/authSlice";
import { RoutesEnum } from "../../app/Routes";
import { FC, ReactNode } from "react";

export const PrivateRoute: FC<{ children?: ReactNode }> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) return <Navigate to={RoutesEnum.Login} />;
  return children ?? <Outlet />;
};
