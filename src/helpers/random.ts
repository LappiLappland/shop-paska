export function shuffleArray<T>(array: T[]) {
  let curr = array.length;
  let rand;

  while (curr > 0) {
    rand = Math.floor(Math.random() * curr);
    curr--;

    [array[curr], array[rand]] = [array[rand], array[curr]];
  }

  return array;
}

export function selectRandomItem<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function selectRandomItems<T>(array: T[], howMany: number) {
  return shuffleArray([...array]).slice(0, howMany);
}

export function randomRange(from: number, to: number) {
  if (from > to) throw new Error('Invalid range: from must be less than to');
  return from + Math.random() * (to - from);
}

export const testing = {
  shuffleArray,
  selectRandomItem,
  selectRandomItems,
  randomRange,
};
