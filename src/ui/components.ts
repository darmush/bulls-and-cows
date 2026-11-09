import { el } from './dom.js';

const createDot = (kind: 'bull' | 'cow'): HTMLSpanElement =>
  el('span', { className: `score__dot score__dot--${kind}` });

export const createLegend = (): HTMLElement =>
  el('footer', { className: 'legend' }, [
    el('div', { className: 'legend__inner' }, [
      el('span', { className: 'score__part' }, [createDot('bull'), 'бык — цифра на своём месте']),
      el('span', { className: 'score__part' }, [
        createDot('cow'),
        'корова — цифра есть, но не на своём месте',
      ]),
    ]),
  ]);
