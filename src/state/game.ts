import type { Base } from '../constants.js';
import { evaluateGuess, type GuessResult } from '../logic/evaluate-guess.js';

export type Settings = {
  readonly length: number;
  readonly base: Base;
};

export type GuessEntry = {
  readonly guess: string;
  readonly result: GuessResult;
};

export type GameState = {
  readonly settings: Settings;
  readonly secret: string;
  readonly history: readonly GuessEntry[];
  readonly startedAt: number;
  readonly finishedAt: number | null;
};

export const createGame = (settings: Settings, secret: string, startedAt: number): GameState => ({
  settings,
  secret,
  history: [],
  startedAt,
  finishedAt: null,
});

export const hasGuess = (game: GameState, guess: string): boolean =>
  game.history.some((entry) => entry.guess.toLowerCase() === guess.toLowerCase());

export const isWon = (game: GameState): boolean => game.finishedAt !== null;

export const makeGuess = (game: GameState, guess: string, now: number): GameState => {
  if (isWon(game) || hasGuess(game, guess)) return game;

  const result = evaluateGuess(game.secret, guess);
  const isWin = result.bulls === game.settings.length;

  return {
    ...game,
    history: [...game.history, { guess, result }],
    finishedAt: isWin ? now : null,
  };
};
