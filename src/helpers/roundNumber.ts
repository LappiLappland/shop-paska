export default function roundNumber(num: number, precision: number) {
  const powed = 10 ** precision;
  return Math.round(num * powed) / powed;
}

export const testing = {
  roundNumber,
};
