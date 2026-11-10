import { RECORDS_LIMIT } from './constants.js';
import { generateSecret } from './logic/generate-secret.js';
import { createGame, getDuration } from './state/game.js';
import { addRecord, filterByMode } from './state/records.js';
import { loadRecords, saveRecords } from './storage/records-storage.js';
import { render } from './ui/dom.js';
import { createGameScreen } from './ui/screens/game-screen.js';
import { createRecordsScreen } from './ui/screens/records-screen.js';
import { createSettingsScreen } from './ui/screens/settings-screen.js';
let lastSettings = { length: 4, base: 10 };
const showSettings = () => {
    render(createSettingsScreen({
        initial: lastSettings,
        onStart: startGame,
        onShowRecords: showRecords,
    }));
};
const startGame = (settings) => {
    lastSettings = settings;
    const game = createGame(settings, generateSecret(settings.length, settings.base), Date.now());
    render(createGameScreen({
        game,
        onWin: finishGame,
        onNewGame: showSettings,
        onShowRecords: () => showRecords(settings),
    }));
};
const showRecords = (settings) => {
    render(createRecordsScreen({ initial: settings, records: loadRecords(), onNewGame: showSettings }));
};
const finishGame = (game) => {
    const current = {
        ...game.settings,
        attempts: game.history.length,
        duration: getDuration(game, Date.now()),
        date: new Date().toISOString(),
    };
    const records = addRecord(loadRecords(), current, RECORDS_LIMIT);
    saveRecords(records);
    return filterByMode(records, game.settings)[0] === current;
};
showSettings();
//# sourceMappingURL=main.js.map