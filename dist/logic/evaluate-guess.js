export const evaluateGuess = (secret, guess) => {
    const guessArr = [...guess.toLowerCase()];
    const cows = guessArr.filter((el, i) => secret.includes(el) && el !== secret[i]).length;
    const bulls = guessArr.filter((el, i) => el === secret[i]).length;
    return { bulls, cows };
};
//# sourceMappingURL=evaluate-guess.js.map