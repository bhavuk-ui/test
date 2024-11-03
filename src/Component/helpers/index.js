export const pageCounter = (limit = 0) => {
  // If limit is 0 or a falsy value, return an empty array
  if (!limit || limit < 10) return [];

  const result = Array.from(
    { length: Math.floor(50 / 10) },
    (_, i) => (i + 1) * 10
  );
  return result;
};
