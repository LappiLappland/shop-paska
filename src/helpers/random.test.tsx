import { testing } from './random';

const { selectRandomItem, selectRandomItems, shuffleArray, randomRange } =
  testing;

describe('shuffleArray', () => {
  test('shuffles the array properly', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray([...array]);
    expect(shuffledArray).not.toEqual(array);
    expect(shuffledArray.length).toBe(array.length);
    shuffledArray.forEach((item) => {
      expect(array).toContain(item);
    });
  });
});

describe('selectRandomItem', () => {
  test('selects a random item from the array', () => {
    const array = [1, 2, 3, 4, 5];
    const randomItem = selectRandomItem(array);
    expect(array).toContain(randomItem);
  });
});

describe('selectRandomItems', () => {
  test('selects specified number of random items from the array', () => {
    const array = [1, 2, 3, 4, 5];
    const howMany = 3;
    const randomItems = selectRandomItems(array, howMany);
    expect(randomItems.length).toBe(howMany);
    randomItems.forEach((item) => {
      expect(array).toContain(item);
    });
  });

  test('selects all items when howMany is greater than the length of the array', () => {
    const array = [1, 2, 3, 4, 5];
    const howMany = 10;
    const randomItems = selectRandomItems(array, howMany);
    expect(randomItems.length).toBe(array.length);
    randomItems.forEach((item) => {
      expect(array).toContain(item);
    });
  });

  test('returns an empty array when howMany is 0', () => {
    const array = [1, 2, 3, 4, 5];
    const howMany = 0;
    const randomItems = selectRandomItems(array, howMany);
    expect(randomItems.length).toBe(0);
  });
});

describe('randomRange', () => {
  test('returns a number within the specified range', () => {
    const from = 1;
    const to = 10;
    const result = randomRange(from, to);
    expect(result).toBeGreaterThanOrEqual(from);
    expect(result).toBeLessThanOrEqual(to);
  });

  test('returns a number within the specified range when from is negative', () => {
    const from = -10;
    const to = 10;
    const result = randomRange(from, to);
    expect(result).toBeGreaterThanOrEqual(from);
    expect(result).toBeLessThanOrEqual(to);
  });

  test('returns a number within the specified range when both from and to are negative', () => {
    const from = -50;
    const to = -30;
    const result = randomRange(from, to);
    expect(result).toBeGreaterThanOrEqual(from);
    expect(result).toBeLessThanOrEqual(to);
  });

  test('returns the same number when from and to are equal', () => {
    const from = 5;
    const to = 5;
    const result = randomRange(from, to);
    expect(result).toBe(from);
  });

  test('returns a number with decimal precision when range is fractional', () => {
    const from = 1.5;
    const to = 3.5;
    const result = randomRange(from, to);
    expect(result % 1).not.toBe(0);
    expect(result).toBeGreaterThanOrEqual(from);
    expect(result).toBeLessThanOrEqual(to);
  });

  test('throws an error when from is greater than to', () => {
    const from = 10;
    const to = 1;
    expect(() => randomRange(from, to)).toThrowError(
      'Invalid range: from must be less than to',
    );
  });
});
