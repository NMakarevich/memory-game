export function getRandomNumber(from, to, array) {
  const random = Math.floor(Math.random() * (to - from + 1) + from);
  if (array.includes(random)) return getRandomNumber(from, to, array);
  return random;
}
