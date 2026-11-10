import { filterByMode } from '../../state/records.js';
import { createRecordsTable } from '../components.js';
import { el } from '../dom.js';
import { createModePicker } from '../mode-picker.js';
export const createRecordsScreen = ({ initial, records, onNewGame, }) => {
    const tableHolder = el('div', { className: 'records-holder' });
    const showTable = (settings) => {
        tableHolder.replaceChildren(createRecordsTable(filterByMode(records, settings)));
    };
    showTable(initial);
    return el('main', { className: 'app app--centered app--records' }, [
        el('div', { className: 'layout' }, [
            el('div', { className: 'column records-column' }, [
                el('h1', { className: 'display', textContent: 'Рекорды' }),
                tableHolder,
            ]),
            el('div', { className: 'column' }, [
                createModePicker({ initial, onChange: showTable }),
                el('div', { className: 'actions' }, [
                    el('button', {
                        type: 'button',
                        className: 'button',
                        textContent: 'Новая игра',
                        onclick: onNewGame,
                    }),
                ]),
            ]),
        ]),
    ]);
};
//# sourceMappingURL=records-screen.js.map