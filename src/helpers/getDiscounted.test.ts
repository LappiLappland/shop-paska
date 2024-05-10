import { testing } from './getDiscounted';

const { getDiscounted } = testing;

describe('getDiscounted', () => {
  test('should return discounted price properly for valid input', () => {
    expect(getDiscounted(100, 0.2)).toBe(80);
  });

  test('should return 0 when discount is 100%', () => {
    expect(getDiscounted(50, 1)).toBe(0);
  });

  test('should return the same price when discount is 0%', () => {
    expect(getDiscounted(75, 0)).toBe(75);
  });

  test('should handle negative prices properly', () => {
    expect(getDiscounted(-50, 0.3)).toBe(-35);
  });

  test('should handle negative discounts properly', () => {
    expect(getDiscounted(100, -0.25)).toBe(125);
  });

  test('should handle large prices and discounts', () => {
    expect(getDiscounted(999999, 0.99)).toBe(9999.99);
  });

  test('should handle decimal discounts properly', () => {
    expect(getDiscounted(200, 0.05)).toBe(190);
  });
});
