import { testing } from './formatNumber';

const { formatNumber } = testing;

describe('formatNumber', () => {
  test('should format positive numbers properly', () => {
    expect(formatNumber(123456789)).toBe('123 456 789');
  });

  test('should format negative numbers properly', () => {
    expect(formatNumber(-123456789)).toBe('-123 456 789');
  });

  test('should round numbers before formatting', () => {
    expect(formatNumber(1234.5678)).toBe('1 235');
  });

  test('should handle numbers with decimal part', () => {
    expect(formatNumber(1234.56)).toBe('1 235');
  });

  test('should handle single digit numbers', () => {
    expect(formatNumber(7)).toBe('7');
  });

  test('should handle zero', () => {
    expect(formatNumber(0)).toBe('0');
  });
});
