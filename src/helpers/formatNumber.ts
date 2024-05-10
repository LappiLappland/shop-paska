export default function formatNumber(num: number) {
  num = Math.round(num);
  const isNegative = num < 0 ? '-' : '';
  const splitted = isNegative
    ? num.toString().slice(1).split('.')
    : num.toString().split('.');

  //Make space every 3 digits
  const main = splitted[0]
    .split('')
    .reduce((prev, curr, i, origin) => {
      const a = origin.length - i;
      if (a % 3 === 0) {
        return prev + ' ' + curr;
      }
      return prev + curr;
    }, '')
    .trim();

  return isNegative + main;
}

export const testing = {
  formatNumber,
};
