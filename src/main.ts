import { render } from './ui/dom.js';
import { createSettingsScreen } from './ui/screens/settings-screen.js';
import { generateSecret } from './logic/generate-secret.js';
import { createGame, type Settings } from './state/game.js';
import { createGameScreen } from './ui/screens/game-screen.js';

let lastSettings: Settings = { length: 4, base: 10 };

const showSettings = (): void => {
  render(
    createSettingsScreen({
      initial: lastSettings,
      onStart: startGame,
      onShowRecords: () => {},
    }),
  );
};

const startGame = (settings: Settings): void => {
  lastSettings = settings;
  const game = createGame(settings, generateSecret(settings.length, settings.base), Date.now());
  render(createGameScreen({ game, onWin: () => {}, onNewGame: showSettings }));
};

showSettings();
