export enum AppRoutes {
  HOME = '/',
  LOGIN = 'login',
}

export const getHomeRoute = () => AppRoutes.HOME;
export const getLoginPage = () => `/${AppRoutes.LOGIN}`;
export const getManagerProductsRoute = () => 'manager/products';
