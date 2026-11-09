export const memoize = <Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
): ((...args: Args) => Result) => {
  const cache = new Map<string, Result>();

  return (...args: Args): Result => {
    const key = JSON.stringify(args);
    const cachedResult = cache.get(key);

    if (cachedResult !== undefined) {
      return cachedResult;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};
