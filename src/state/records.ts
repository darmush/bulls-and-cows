import type { Base } from '../constants.js';
import type { Settings } from './game.js';

export type RecordEntry = {
  readonly attempts: number;
  readonly duration: number;
  readonly date: string;
  readonly length: number;
  readonly base: Base;
};

export const compareRecords = (a: RecordEntry, b: RecordEntry): number =>
  a.attempts - b.attempts || a.duration - b.duration;

const isSameMode =
  ({ length, base }: Settings) =>
  (record: RecordEntry): boolean =>
    record.length === length && record.base === base;

export const filterByMode = (records: readonly RecordEntry[], settings: Settings): RecordEntry[] =>
  records.filter(isSameMode(settings)).sort(compareRecords);

export const addRecord = (
  records: readonly RecordEntry[],
  entry: RecordEntry,
  limit: number,
): RecordEntry[] => {
  const top = [...filterByMode(records, entry), entry].sort(compareRecords).slice(0, limit);
  const otherModes = records.filter((record) => !isSameMode(entry)(record));

  return [...otherModes, ...top];
};
