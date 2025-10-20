export interface TrackerItem {
  id: string;
  content: string;
}

export interface TrackerList {
  id: string;
  name: string;
  items: TrackerItem[];
}

export const TRACKER_STORAGE_KEY = 'trackerLists';

export function createEmptyList(name: string): TrackerList {
  return {
    id: crypto.randomUUID(),
    name,
    items: [],
  };
}

export function createTrackerItem(content: string): TrackerItem {
  return {
    id: crypto.randomUUID(),
    content,
  };
}
