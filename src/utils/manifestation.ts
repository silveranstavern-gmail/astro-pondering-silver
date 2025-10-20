export interface ManifestationTrackerData {
  affirmations: string[];
  repetitionMode: 36 | 108;
  startDate: string;
  completionData: boolean[][];
}

export const MANIFESTATION_STORAGE_KEY = 'manifestationTracker';
export const MANIFESTATION_SECTIONS_KEY = 'manifestationTrackerSections';

export const REPETITION_MODES: Array<36 | 108> = [36, 108];

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
}

export function isDayToday(startDate: Date, dayOffset: number): boolean {
  return isToday(addDays(startDate, dayOffset));
}

export function getDaysElapsed(startDate: Date): number {
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function parseDate(value: unknown): Date {
  if (typeof value === 'string' || value instanceof String) {
    const date = new Date(value);
    if (isValidDate(date)) return date;
  }
  if (value instanceof Date && isValidDate(value)) {
    return value;
  }
  return new Date();
}

export function createEmptyCompletionMatrix(): boolean[][] {
  return Array.from({ length: 7 }, () => [false, false, false]);
}
