export const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
};
export const formatDate = (isoDate) => new Date(isoDate).toLocaleDateString('ru-RU');
export const pluralize = (count, [one, few, many]) => {
    const lastTwo = count % 100;
    const last = count % 10;
    if (lastTwo >= 11 && lastTwo <= 14)
        return many;
    if (last === 1)
        return one;
    if (last >= 2 && last <= 4)
        return few;
    return many;
};
//# sourceMappingURL=format.js.map