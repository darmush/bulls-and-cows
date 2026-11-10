import { el } from './dom.js';
import { formatDate, formatTime } from './format.js';
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
const createSmallButton = (text, onClick) => el('button', {
    type: 'button',
    className: 'button button--ghost button--small',
    textContent: text,
    onclick: onClick,
});
export const createTopbar = (content, onNewGame, onShowRecords) => el('header', { className: 'topbar' }, [
    el('div', { className: 'topbar__side' }, content),
    el('div', { className: 'topbar__actions' }, [
        createSmallButton('Рекорды', onShowRecords),
        createSmallButton('Новая игра', onNewGame),
    ]),
]);
export const createRecordsTable = (records) => {
    const head = el('tr', {}, ['#', 'Попытки', 'Время', 'Дата'].map((text) => el('th', { textContent: text })));
    const rows = records.map((record, index) => el('tr', {}, [
        el('td', { textContent: String(index + 1) }),
        el('td', { textContent: String(record.attempts) }),
        el('td', { textContent: formatTime(record.duration) }),
        el('td', { textContent: formatDate(record.date) }),
    ]));
    return el('table', { className: 'records' }, [el('thead', {}, [head]), el('tbody', {}, rows)]);
};
//# sourceMappingURL=components.js.map