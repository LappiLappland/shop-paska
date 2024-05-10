import roundNumber from './roundNumber';

export function getDiscounted(price: number, discount: number) {
  return roundNumber(price * (1 - discount), 2);
}

export const testing = {
  getDiscounted,
};
