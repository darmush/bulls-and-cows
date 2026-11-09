import { el } from './dom.js';
const createDot = (kind) => el('span', { className: `score__dot score__dot--${kind}` });
export const createLegend = () => el('footer', { className: 'legend' }, [
    el('div', { className: 'legend__inner' }, [
        el('span', { className: 'score__part' }, [createDot('bull'), 'бык — цифра на своём месте']),
        el('span', { className: 'score__part' }, [
            createDot('cow'),
            'корова — цифра есть, но не на своём месте',
        ]),
    ]),
]);
const createScorePart = (count, kind) => el('span', { className: count === 0 ? 'score__part score__part--zero' : 'score__part' }, [
    createDot(kind),
    String(count),
]);
export const createScore = ({ bulls, cows }) => el('span', { className: 'score' }, [
    createScorePart(bulls, 'bull'),
    createScorePart(cows, 'cow'),
]);
export const createTopbar = (content, onNewGame) => el('header', { className: 'topbar' }, [
    el('div', { className: 'topbar__side' }, content),
    el('button', {
        type: 'button',
        className: 'button button--ghost button--small',
        textContent: 'Новая игра',
        onclick: onNewGame,
    }),
]);
//# sourceMappingURL=components.js.map