export const AppRoutes = {
  home: '/',
  stores: '/stores',
} as const;

export const getStoreDetailRoute = (storeId: number) =>
  `${AppRoutes.stores}/${storeId}`;
