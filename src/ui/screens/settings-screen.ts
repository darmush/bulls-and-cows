import { countPossibleSecrets } from '../../logic/count-possible-secrets.js';
import type { Settings } from '../../state/game.js';
import { el } from '../dom.js';
import { createModePicker } from '../mode-picker.js';

type SettingsScreenOptions = {
  initial: Settings;
  onStart: (settings: Settings) => void;
  onShowRecords: (settings: Settings) => void;
};

const formatCount = ({ length, base }: Settings): string =>
  countPossibleSecrets(length, base).toLocaleString('ru-RU');

export const createSettingsScreen = ({
  initial,
  onStart,
  onShowRecords,
}: SettingsScreenOptions): HTMLElement => {
  let selected = initial;

  const counter = el('span', { className: 'counter', textContent: formatCount(initial) });

  const picker = createModePicker({
    initial,
    onChange: (settings) => {
      selected = settings;
      counter.textContent = formatCount(settings);
    },
  });

  return el('main', { className: 'app app--centered' }, [
    el('div', { className: 'layout' }, [
      el('div', { className: 'column' }, [
        el('h1', { className: 'display' }, ['Быки и', el('br'), 'коровы']),
        el('div', { className: 'display__subtitle' }, [
          el('p', { className: 'lead' }, [
            'Число загадано. Цифры не повторяются. Угадай какое из ',
            counter,
          ]),
        ]),
      ]),
      el('div', { className: 'column' }, [
        picker,
        el('div', { className: 'actions' }, [
          el('button', {
            type: 'button',
            className: 'button',
            textContent: 'Начать игру',
            onclick: () => onStart(selected),
          }),
          el('button', {
            type: 'button',
            className: 'button button--ghost',
            textContent: 'Рекорды',
            onclick: () => onShowRecords(selected),
          }),
        ]),
      ]),
    ]),
  ]);
};
