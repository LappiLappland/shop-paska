import { testing } from './string';

const { stringUpperStart } = testing;

describe('stringUpperStart', () => {
  test('should capitalize the first letter of a string', () => {
    expect(stringUpperStart('hello')).toBe('Hello');
    expect(stringUpperStart('world')).toBe('World');
    expect(stringUpperStart('apple')).toBe('Apple');
  });

  test('should handle empty string', () => {
    expect(stringUpperStart('')).toBe('');
  });

  test('should handle single character string', () => {
    expect(stringUpperStart('a')).toBe('A');
    expect(stringUpperStart('z')).toBe('Z');
  });

  test('should handle string with all lowercase letters', () => {
    expect(stringUpperStart('hello world')).toBe('Hello world');
    expect(stringUpperStart('the quick brown fox')).toBe('The quick brown fox');
  });

  test('should handle string with leading whitespace', () => {
    expect(stringUpperStart('  hello')).toBe('  Hello');
    expect(stringUpperStart('   world')).toBe('   World');
  });

  test('should handle string with leading numbers', () => {
    expect(stringUpperStart('123 hello')).toBe('123 hello');
    expect(stringUpperStart('42world')).toBe('42world');
  });

  test('should handle non-alphabetic characters', () => {
    expect(stringUpperStart('!hello')).toBe('!hello');
    expect(stringUpperStart('@world')).toBe('@world');
  });
});
