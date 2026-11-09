import type { Settings } from './state/game.js';
import { render } from './ui/dom.js';
import { createSettingsScreen } from './ui/screens/settings-screen.js';

let lastSettings: Settings = { length: 4, base: 10 };

const showSettings = (): void => {
  render(
    createSettingsScreen({
      initial: lastSettings,
      onStart: (settings) => {
        lastSettings = settings;
      },
      onShowRecords: () => {},
    }),
  );
};

showSettings();
