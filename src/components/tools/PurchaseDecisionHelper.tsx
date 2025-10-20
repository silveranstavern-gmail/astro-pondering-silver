import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SortType, PurchaseItem } from '../../utils/purchase';
import {
  PURCHASE_STORAGE_KEY,
  createItem,
  parseItems,
  sortItems,
} from '../../utils/purchase';

function formatSortLabel(sort: SortType): string {
  switch (sort) {
    case 'cost':
      return 'Cost';
    case 'desirability':
      return 'Desirability';
    default:
      return 'Value ratio';
  }
}

export function PurchaseDecisionHelper() {
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [sortType, setSortType] = useState<SortType>('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(PURCHASE_STORAGE_KEY);
      if (!raw) return;
      const parsed = parseItems(JSON.parse(raw));
      if (parsed.length) {
        setItems(parsed);
      }
    } catch (error) {
      console.warn('PurchaseDecisionHelper: unable to load saved items', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(PURCHASE_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const sortedItems = useMemo(() => sortItems(items, sortType), [items, sortType]);

  const addItem = useCallback(() => {
    setItems((previous) => [...previous, createItem()]);
  }, []);

  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
  }, []);

  const updateItem = useCallback((id: string, changes: Partial<PurchaseItem>) => {
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    );
  }, []);

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={addItem}
          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          Add Item
        </button>
        <button
          type="button"
          onClick={clearItems}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Clear All
        </button>
      </section>

      <section className="flex flex-wrap gap-3">
        {( ['default', 'cost', 'desirability'] as SortType[] ).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSortType(type)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 ${
              sortType === type
                ? 'bg-green-500 text-white shadow'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Sort by {formatSortLabel(type)}
          </button>
        ))}
      </section>

      <section className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full table-auto divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">Item name</th>
              <th scope="col" className="px-4 py-3 text-left">Cost</th>
              <th scope="col" className="px-4 py-3 text-left">Desirability</th>
              <th scope="col" className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedItems.length ? (
              sortedItems.map((item) => (
                <tr key={item.id} className="transition hover:bg-gray-50">
                  <td className="px-4 py-3 align-top">
                    <label className="sr-only" htmlFor={`name-${item.id}`}>
                      Item name
                    </label>
                    <input
                      id={`name-${item.id}`}
                      type="text"
                      value={item.name}
                      onChange={(event) => updateItem(item.id, { name: event.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-100"
                      placeholder="Item name"
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <label className="sr-only" htmlFor={`cost-${item.id}`}>
                      Cost
                    </label>
                    <input
                      id={`cost-${item.id}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={Number.isFinite(item.cost) ? item.cost : 0}
                      onChange={(event) =>
                        updateItem(item.id, { cost: Number.parseFloat(event.target.value) || 0 })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-100"
                      placeholder="0.00"
                      inputMode="decimal"
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <label className="sr-only" htmlFor={`desirability-${item.id}`}>
                      Desirability
                    </label>
                    <input
                      id={`desirability-${item.id}`}
                      type="number"
                      min="0"
                      max="1000"
                      value={Number.isFinite(item.desirability) ? item.desirability : 0}
                      onChange={(event) =>
                        updateItem(item.id, {
                          desirability: Number.parseFloat(event.target.value) || 0,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:border-purple-400 focus:outline-none focus:ring focus:ring-purple-100"
                      placeholder="500"
                      inputMode="numeric"
                    />
                  </td>
                  <td className="px-4 py-3 align-top">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                  No items yet. Click <span className="font-medium text-purple-600">Add Item</span> to compare your options.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">How to read the value sort</h2>
        <p className="mt-3">
          “Value ratio” compares desirability to cost so high-impact, lower-cost items surface first. Switch to cost or
          desirability sorting whenever you want a single dimension view.
        </p>
      </section>
    </div>
  );
}
