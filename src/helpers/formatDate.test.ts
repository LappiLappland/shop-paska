import { testing } from './formatDate';

const { padTo2Digits, formatDate } = testing;

describe('padTo2Digits', () => {
  test('should pad single digit number with leading zero', () => {
    expect(padTo2Digits(5)).toBe('05');
  });

  test('should not pad double digit number', () => {
    expect(padTo2Digits(12)).toBe('12');
  });

  test('should return "00" for 0', () => {
    expect(padTo2Digits(0)).toBe('00');
  });
});

describe('formatDate', () => {
  test('should return properly formatted date string', () => {
    // Mocking date to ensure consistent tests
    const mockDate = new Date('2024-03-27T12:00:00');
    const formattedDate = formatDate(mockDate);
    expect(formattedDate).toBe('2024-03-27');
  });

  test('should handle single digit month and day', () => {
    // Mocking date to ensure consistent tests
    const mockDate = new Date('2024-01-01T12:00:00');
    const formattedDate = formatDate(mockDate);
    expect(formattedDate).toBe('2024-01-01');
  });

  test('should handle leap year', () => {
    // Mocking date to ensure consistent tests
    const mockDate = new Date('2020-02-29T12:00:00');
    const formattedDate = formatDate(mockDate);
    expect(formattedDate).toBe('2020-02-29');
  });
});
