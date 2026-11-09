import { BASES, MAX_LENGTH, MIN_LENGTH, BASE_LABELS } from '../constants.js';
import { countPossibleSecrets } from '../logic/count-possible-secrets.js';
import { el } from './dom.js';
const LENGTHS = Array.from({ length: MAX_LENGTH - MIN_LENGTH + 1 }, (_, index) => MIN_LENGTH + index);
const isPossible = (length, base) => countPossibleSecrets(length, base) > 0;
const fitLength = (length, base) => isPossible(length, base) ? length : MIN_LENGTH;
const createOption = (text, onSelect) => el('button', {
    type: 'button',
    className: 'choice__option',
    textContent: text,
    onclick: onSelect,
});
const createGroup = (label, buttons) => el('div', {}, [
    el('p', { className: 'label', textContent: label }),
    el('div', { className: 'choice' }, buttons),
]);
export const createModePicker = ({ initial, onChange }) => {
    let selected = initial;
    const baseOptions = BASES.map((base) => ({
        base,
        button: createOption(BASE_LABELS[base], () => select({ base, length: fitLength(selected.length, base) })),
    }));
    const lengthOptions = LENGTHS.map((length) => ({
        length,
        button: createOption(String(length), () => select({ ...selected, length })),
    }));
    const update = () => {
        baseOptions.forEach(({ base, button }) => {
            button.classList.toggle('choice__option--active', base === selected.base);
        });
        lengthOptions.forEach(({ length, button }) => {
            button.classList.toggle('choice__option--active', length === selected.length);
            button.disabled = !isPossible(length, selected.base);
        });
    };
    const select = (next) => {
        selected = next;
        update();
        onChange(selected);
    };
    update();
    return el('div', { className: 'column' }, [
        createGroup('Система счисления', baseOptions.map(({ button }) => button)),
        createGroup('Длина числа', lengthOptions.map(({ button }) => button)),
    ]);
};
//# sourceMappingURL=mode-picker.js.map