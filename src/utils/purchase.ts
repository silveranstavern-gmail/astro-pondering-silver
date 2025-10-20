export interface PurchaseItem {
  id: string;
  name: string;
  cost: number;
  desirability: number;
}

export type SortType = 'default' | 'cost' | 'desirability';

export const PURCHASE_STORAGE_KEY = 'purchaseItems';

export function createItem(): PurchaseItem {
  return {
    id: typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
    name: '',
    cost: 0,
    desirability: 500,
  };
}

export function sortItems(items: PurchaseItem[], sortType: SortType): PurchaseItem[] {
  const clone = [...items];
  const safeRatio = (item: PurchaseItem) => (item.cost > 0 ? item.desirability / item.cost : item.desirability === 0 ? 0 : Number.POSITIVE_INFINITY);

  return clone.sort((a, b) => {
    switch (sortType) {
      case 'cost':
        return a.cost - b.cost;
      case 'desirability':
        return b.desirability - a.desirability;
      default:
        return safeRatio(b) - safeRatio(a);
    }
  });
}

export function parseItems(value: unknown): PurchaseItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== 'object') return null;
      const item = entry as Partial<PurchaseItem>;
      if (typeof item.id !== 'string') return null;
      return {
        id: item.id,
        name: typeof item.name === 'string' ? item.name : '',
        cost: typeof item.cost === 'number' && !Number.isNaN(item.cost) ? item.cost : 0,
        desirability:
          typeof item.desirability === 'number' && !Number.isNaN(item.desirability) ? item.desirability : 500,
      } satisfies PurchaseItem;
    })
    .filter(Boolean) as PurchaseItem[];
}
