import { createDigitValidator } from '../../logic/create-digit-validator.js';
import { isValidGuess } from '../../logic/is-valid-guess.js';
import { hasGuess, isWon, makeGuess } from '../../state/game.js';
import { createLegend, createScore, createTopbar } from '../components.js';
import { el } from '../dom.js';
import { formatMode, formatTime } from '../format.js';
export const createGameScreen = ({ game: initialGame, onWin, onNewGame }) => {
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
    const renderCells = (value) => {
        cells.forEach((cell, index) => {
            cell.textContent = value.charAt(index);
            cell.classList.toggle('digits__cell--active', index === value.length);
        });
    };
    const renderHistory = () => {
        if (game.history.length === 0) {
            history.replaceChildren(el('p', { className: 'history__empty', textContent: 'Здесь появятся ваши попытки' }));
            return;
        }
        const rows = game.history
            .map(({ guess, result }, index) => el('tr', { className: result.bulls === length ? 'history__row--win' : '' }, [
            el('td', { className: 'history__index', textContent: String(index + 1).padStart(2, '0') }),
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
        input.value = '';
        renderCells('');
        renderHistory();
        if (isWon(game))
            onWin(game);
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
        timer.textContent = formatTime(Date.now() - game.startedAt);
    }, 1000);
    renderCells('');
    renderHistory();
    requestAnimationFrame(() => input.focus());
    return el('main', { className: 'app app--with-legend' }, [
        createTopbar([el('span', { className: 'badge', textContent: formatMode(game.settings) }), timer], onNewGame),
        el('div', { className: 'layout' }, [
            el('form', {
                className: 'guess',
                noValidate: true,
                onsubmit: (event) => {
                    event.preventDefault();
                    submit();
                },
            }, [
                el('label', { className: 'label', htmlFor: 'guess-input', textContent: 'Ваш вариант' }),
                el('div', { className: 'guess__field' }, [
                    el('div', { className: 'digits' }, [input, ...cells]),
                    el('button', { type: 'submit', className: 'button', textContent: 'Проверить' }),
                ]),
                note,
            ]),
            history,
        ]),
        createLegend(),
    ]);
};
//# sourceMappingURL=game-screen.js.map