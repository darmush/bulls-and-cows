const STORAGE_KEY = 'bulls-and-cows:records';
export const loadRecords = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    }
    catch {
        return [];
    }
};
export const saveRecords = (records) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }
    catch {
        return;
    }
};
//# sourceMappingURL=records-storage.js.map