import { sortToString } from '../../src/presentation/utils/sortOptionToString';

describe('sortToString', () => {
  it('returns the correct string for each sort option', () => {
    expect(sortToString('price-asc')).toBe('Mayor precio');
    expect(sortToString('price-desc')).toBe('Menor precio');
    expect(sortToString('rating-asc')).toBe('Popular');
    expect(sortToString('rating-desc')).toBe('Menos popular');
    expect(sortToString(null)).toBe('Ordenar por');
  });
});
