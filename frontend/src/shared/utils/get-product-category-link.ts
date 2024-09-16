import { StoreProductCategory } from '@/shared/services/stores';

export const getProductCategoryLink = (category: StoreProductCategory) =>
  `${category.name}-${category.id}`;
