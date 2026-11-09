import { BASES, MAX_LENGTH, MIN_LENGTH, BASE_LABELS, type Base } from '../constants.js';
import { countPossibleSecrets } from '../logic/count-possible-secrets.js';
import type { Settings } from '../state/game.js';
import { el } from './dom.js';

type ModePickerOptions = {
  initial: Settings;
  onChange: (settings: Settings) => void;
};

const LENGTHS = Array.from(
  { length: MAX_LENGTH - MIN_LENGTH + 1 },
  (_, index) => MIN_LENGTH + index,
);

const isPossible = (length: number, base: Base): boolean => countPossibleSecrets(length, base) > 0;

const fitLength = (length: number, base: Base): number =>
  isPossible(length, base) ? length : MIN_LENGTH;

const createOption = (text: string, onSelect: () => void): HTMLButtonElement =>
  el('button', {
    type: 'button',
    className: 'choice__option',
    textContent: text,
    onclick: onSelect,
  });

const createGroup = (label: string, buttons: HTMLButtonElement[]): HTMLDivElement =>
  el('div', {}, [
    el('p', { className: 'label', textContent: label }),
    el('div', { className: 'choice' }, buttons),
  ]);

export const createModePicker = ({ initial, onChange }: ModePickerOptions): HTMLDivElement => {
  let selected = initial;

  const baseOptions = BASES.map((base) => ({
    base,
    button: createOption(BASE_LABELS[base], () =>
      select({ base, length: fitLength(selected.length, base) }),
    ),
  }));

  const lengthOptions = LENGTHS.map((length) => ({
    length,
    button: createOption(String(length), () => select({ ...selected, length })),
  }));

  const update = (): void => {
    baseOptions.forEach(({ base, button }) => {
      button.classList.toggle('choice__option--active', base === selected.base);
    });
    lengthOptions.forEach(({ length, button }) => {
      button.classList.toggle('choice__option--active', length === selected.length);
      button.disabled = !isPossible(length, selected.base);
    });
  };

  const select = (next: Settings): void => {
    selected = next;
    update();
    onChange(selected);
  };

  update();

  return el('div', { className: 'column' }, [
    createGroup(
      'Система счисления',
      baseOptions.map(({ button }) => button),
    ),
    createGroup(
      'Длина числа',
      lengthOptions.map(({ button }) => button),
    ),
  ]);
};
