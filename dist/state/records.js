export const compareRecords = (a, b) => a.attempts - b.attempts || a.duration - b.duration;
const isSameMode = ({ length, base }) => (record) => record.length === length && record.base === base;
export const filterByMode = (records, settings) => records.filter(isSameMode(settings)).sort(compareRecords);
export const addRecord = (records, entry, limit) => {
    const top = [...filterByMode(records, entry), entry].sort(compareRecords).slice(0, limit);
    const otherModes = records.filter((record) => !isSameMode(entry)(record));
    return [...otherModes, ...top];
};
//# sourceMappingURL=records.js.map