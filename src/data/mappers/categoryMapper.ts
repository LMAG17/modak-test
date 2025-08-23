import { Category } from '../../domain/entities/Category';

export const mapApiCategoryToEntity = (category: any): Category => ({
  slug: category.slug,
  name: category.name,
  url: category.url,
});
