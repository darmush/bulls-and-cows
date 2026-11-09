import { memoize } from '../utils/memoize.js';
const count = (length, base) => {
    if (length === 0)
        return 1;
    return base * countPossibleSecrets(length - 1, base - 1);
};
export const countPossibleSecrets = memoize(count);
//# sourceMappingURL=count-possible-secrets.js.map