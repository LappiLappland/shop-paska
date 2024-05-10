import { testing } from './roundNumber';

const { roundNumber } = testing;

describe('roundNumber', () => {
  test('should round number to specified precision', () => {
    expect(roundNumber(3.14159, 2)).toBeCloseTo(3.14);
    expect(roundNumber(123.456, 1)).toBeCloseTo(123.5);
    expect(roundNumber(2.5, 0)).toBe(3);
    expect(roundNumber(5.8, 0)).toBe(6);
  });

  test('should return the same number when precision is 0', () => {
    expect(roundNumber(123.456, 0)).toBe(123);
    expect(roundNumber(2.5, 0)).toBe(3);
    expect(roundNumber(5.8, 0)).toBe(6);
  });

  test('should handle negative numbers properly', () => {
    expect(roundNumber(-3.14159, 2)).toBeCloseTo(-3.14);
    expect(roundNumber(-123.456, 1)).toBeCloseTo(-123.5);
  });

  test('should handle precision greater than the number of decimal places', () => {
    expect(roundNumber(7, 3)).toBe(7);
    expect(roundNumber(1.2345, 6)).toBe(1.2345);
  });
});
