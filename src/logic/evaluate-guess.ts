export type GuessResult = {
  bulls: number;
  cows: number;
};

export const evaluateGuess = (_secret: string, _guess: string): GuessResult => {
  throw new Error('Function not implemented.');
};
