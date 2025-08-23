import { SortOption } from '../components/FilterModal';

export const sortToString = (sortValue: SortOption | null) => {
  switch (sortValue) {
    case 'price-asc':
      return 'Mayor precio';
    case 'price-desc':
      return 'Menor precio';
    case 'rating-asc':
      return 'Popular';
    case 'rating-desc':
      return 'Menos popular';
    default:
      return 'Ordenar por';
  }
};
