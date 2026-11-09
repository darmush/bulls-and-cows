import { evaluateGuess } from '../logic/evaluate-guess.js';
export const createGame = (settings, secret, startedAt) => ({
    settings,
    secret,
    history: [],
    startedAt,
    finishedAt: null,
});
export const hasGuess = (game, guess) => game.history.some((entry) => entry.guess.toLowerCase() === guess.toLowerCase());
export const isWon = (game) => game.finishedAt !== null;
export const makeGuess = (game, guess, now) => {
    if (isWon(game) || hasGuess(game, guess))
        return game;
    const result = evaluateGuess(game.secret, guess);
    const isWin = result.bulls === game.settings.length;
    return {
        ...game,
        history: [...game.history, { guess, result }],
        finishedAt: isWin ? now : null,
    };
};
//# sourceMappingURL=game.js.map