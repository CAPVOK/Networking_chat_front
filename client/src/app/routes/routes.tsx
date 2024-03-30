import { MainLayout } from "../../components";
import { MainPage, NotFoundPage } from "../../pages";
import { IAppRoute } from "./types";

/**
 * Маршруты приложения
 */
export enum RoutesEnum {
  Home = "/",
}

/**
 * Кастомные объекты маршрутов (с label и icon для sidebar)
 * @const IAppRoute[]
 */
export const routes: IAppRoute[] = [
  {
    path: RoutesEnum.Home,
    element: <MainLayout />,
    children: [
      {
        path: RoutesEnum.Home,
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
