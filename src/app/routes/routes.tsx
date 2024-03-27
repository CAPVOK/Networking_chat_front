import { MainLayout } from "../../components";
import { LoginPage, MainPage, NotFoundPage } from "../../pages";
import { IAppRoute } from "./types";

/**
 * Маршруты приложения
 */
export enum RoutesEnum {
  Home = "/",
  Register = "/register",
  Login = "/login",
}

/**
 * Кастомные объекты маршрутов (с label и icon для sidebar)
 * @const IAppRoute[]
 */
export const routes: IAppRoute[] = [
  {
    path: RoutesEnum.Home,
    element: <MainLayout />,
    isPrivate: true,
    children: [
      {
        path: RoutesEnum.Home,
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: RoutesEnum.Login,
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
