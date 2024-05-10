export function stringUpperStart(str: string) {
  const letterPos = str.search(/[^ ]/);
  if (letterPos === -1) return str;
  return (
    str.slice(0, letterPos) +
    str[letterPos].toUpperCase() +
    str.slice(letterPos + 1)
  );
}

export const testing = {
  stringUpperStart,
};
