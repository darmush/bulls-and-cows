import { BASE_LABELS } from '../constants.js';
import type { Settings } from '../state/game.js';

export const formatMode = ({ length, base }: Settings): string =>
  `${length} · ${BASE_LABELS[base]}`;

export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
};
