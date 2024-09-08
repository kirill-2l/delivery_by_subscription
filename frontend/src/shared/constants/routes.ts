export const AppRoutes = {
  home: '/',
  products: '/products',
} as const;

export const getRouteProductDetail = (productId: number) =>
  `${AppRoutes.products}/${productId}`;
