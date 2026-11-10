import { BASE_LABELS } from '../../constants.js';
import { createDigitValidator } from '../../logic/create-digit-validator.js';
import { isValidGuess } from '../../logic/is-valid-guess.js';
import { getDuration, hasGuess, isWon, makeGuess } from '../../state/game.js';
import { createLegend, createScore, createTopbar } from '../components.js';
import { el } from '../dom.js';
import { formatTime, pluralize } from '../format.js';
export const createGameScreen = ({ game: initialGame, onWin, onNewGame, onShowRecords, }) => {
    let game = initialGame;
    const { length, base } = game.settings;
    const isValidDigit = createDigitValidator(base);
    const input = el('input', {
        className: 'digits__input',
        id: 'guess-input',
        maxLength: length,
        autocomplete: 'off',
        spellcheck: false,
    });
    const cells = Array.from({ length }, () => el('span', { className: 'digits__cell' }));
    const note = el('p', { className: 'note' });
    const history = el('div');
    const timer = el('span', { className: 'timer', textContent: formatTime(0) });
    const digits = el('div', { className: 'digits' }, [input, ...cells]);
    const submitButton = el('button', {
        type: 'submit',
        className: 'button',
        textContent: 'Проверить',
    });
    const renderCells = (value) => {
        cells.forEach((cell, index) => {
            cell.textContent = value.charAt(index);
            cell.classList.toggle('digits__cell--active', index === value.length);
        });
    };
    const renderHistory = () => {
        const rows = game.history
            .map(({ guess, result }, index) => el('tr', { className: result.bulls === length ? 'history__row--win' : '' }, [
            el('td', {
                className: 'history__index',
                textContent: String(index + 1).padStart(2, '0'),
            }),
            el('td', { className: 'history__guess', textContent: guess }),
            el('td', {}, [createScore(result)]),
        ]))
            .reverse();
        const head = el('tr', {}, ['№', 'Попытка', 'Результат'].map((text) => el('th', { textContent: text })));
        history.replaceChildren(el('table', { className: 'history' }, [el('thead', {}, [head]), el('tbody', {}, rows)]));
    };
    const getError = (guess) => {
        if (guess.length < length)
            return 'Введите все цифры';
        if (!isValidGuess(guess, length, base))
            return 'Цифры не должны повторяться';
        if (hasGuess(game, guess))
            return 'Такая попытка уже была';
        return null;
    };
    const submit = () => {
        const guess = input.value;
        const error = getError(guess);
        note.textContent = error ?? '';
        input.focus();
        if (error !== null)
            return;
        game = makeGuess(game, guess, Date.now());
        renderHistory();
        if (isWon(game)) {
            showWin(onWin(game));
            return;
        }
        input.value = '';
        renderCells('');
    };
    const showWin = (isRecord) => {
        const attempts = game.history.length;
        const attemptsText = `${attempts} ${pluralize(attempts, ['попытка', 'попытки', 'попыток'])}`;
        note.textContent = `Успех! ${attemptsText}${isRecord ? '. Рекорд!' : ''}`;
        note.classList.add('note--success');
        timer.textContent = formatTime(getDuration(game, Date.now()));
        timer.classList.add('timer--won');
        digits.classList.add('digits--won');
        input.disabled = true;
        submitButton.disabled = true;
    };
    input.addEventListener('input', () => {
        input.value = [...input.value].filter(isValidDigit).join('').slice(0, length);
        note.textContent = '';
        renderCells(input.value);
    });
    const intervalId = setInterval(() => {
        if (!timer.isConnected || isWon(game)) {
            clearInterval(intervalId);
            return;
        }
        timer.textContent = formatTime(getDuration(game, Date.now()));
    }, 1000);
    renderCells('');
    renderHistory();
    requestAnimationFrame(() => input.focus());
    return el('main', { className: 'app app--with-legend' }, [
        createTopbar([timer], onNewGame, onShowRecords),
        el('div', { className: 'layout' }, [
            el('form', {
                className: 'guess',
                noValidate: true,
                onsubmit: (event) => {
                    event.preventDefault();
                    submit();
                },
            }, [
                el('div', { className: 'guess__head' }, [
                    el('label', {
                        className: 'label',
                        htmlFor: 'guess-input',
                        textContent: 'Твой вариант',
                    }),
                    el('span', { className: 'label', textContent: BASE_LABELS[base] }),
                ]),
                el('div', { className: 'guess__field' }, [
                    digits,
                    el('div', { className: 'guess__submit' }, [note, submitButton]),
                ]),
            ]),
            history,
        ]),
        createLegend(),
    ]);
};
//# sourceMappingURL=game-screen.js.map