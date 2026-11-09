import { BASE_LABELS } from '../constants.js';
export const formatMode = ({ length, base }) => `${length} · ${BASE_LABELS[base]}`;
export const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};
//# sourceMappingURL=format.js.map