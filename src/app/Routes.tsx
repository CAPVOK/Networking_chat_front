import { RouteObject } from "react-router-dom";
import { MainLayout, PrivateRoute } from "../components";
import { LoginPage, MainPage, NotFoundPage } from "../pages";

/**
 * Маршруты приложения

 */
export enum RoutesEnum {
  Home = "/",
  Register = "/register",
  Login = "/login",
}

export interface IAppRoute {
  label?: string;
  path: string;
  index?: boolean;
  isPrivate?: boolean;
  icon?: JSX.Element;
  element: JSX.Element;
  children?: IAppRoute[];
}

export interface ISimpleRouteObject {
  label?: string;
  icon?: JSX.Element;
  path: string;
}

/**
 * Кастомные объекты маршрутов (с label и icon для sidebar)
 * @const IAppRoute[]
 */
export const routes: IAppRoute[] = [
  {
    path: "/",
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

export const realRoutes: RouteObject[] = convertRoutes(routes);

export const smallRoutes = selectRoutes(routes);

/**
 * @param routes IAppRoute[] - Массив объектов маршрутов.
 * @returns RouteObject[] - Массив объектов маршрутов для router dom
 */
function convertRoutes(routes: IAppRoute[]): RouteObject[] {
  return routes.map((route) => {
    const convertedRoute: RouteObject = {
      path: route.path,
      element: route.isPrivate ? (
        <PrivateRoute>{route.element}</PrivateRoute>
      ) : (
        route.element
      ),
    };
    if (route.children) {
      convertedRoute.children = convertRoutes(route.children);
    }
    return convertedRoute;
  });
}

/**
 * @param routes IAppRoute[] - Массив объектов маршрутов.
 * @returns ISimpleRouteObject[] - Массив простых объектов маршрутов для sidebar и тд.
 */
export function selectRoutes(routes: IAppRoute[]) {
  const selected: ISimpleRouteObject[] = [];
  routes.forEach((route) => {
    if (Object.prototype.hasOwnProperty.call(route, "children")) {
      route.children && selected.push(...selectRoutes(route.children));
    } else {
      route.label &&
        selected.push({
          path: route.path,
          label: route.label,
          icon: route.icon,
        });
    }
  });
  return selected;
}
