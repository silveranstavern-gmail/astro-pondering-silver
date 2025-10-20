import {
  DndContext,
  PointerSensor,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  TRACKER_STORAGE_KEY,
  createEmptyList,
  createTrackerItem,
  type TrackerItem,
  type TrackerList,
} from '../../utils/tracker';

interface NewItemState {
  [listId: string]: string;
}

function findListByItemId(lists: TrackerList[], itemId: string): TrackerList | undefined {
  return lists.find((list) => list.items.some((item) => item.id === itemId));
}

function SortableItem({
  item,
  onDelete,
  onEdit,
  isEditing,
  editContent,
  onEditChange,
  onEditConfirm,
  onEditCancel,
}: {
  item: TrackerItem;
  onDelete: () => void;
  onEdit: () => void;
  isEditing: boolean;
  editContent: string;
  onEditChange: (value: string) => void;
  onEditConfirm: () => void;
  onEditCancel: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: { type: 'item', itemId: item.id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-lg border border-transparent bg-white p-4 shadow-sm transition ${
        isDragging ? 'z-10 border-purple-300 shadow-lg' : 'hover:border-gray-200'
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center gap-3">
        {isEditing ? (
          <input
            value={editContent}
            onChange={(event) => onEditChange(event.target.value)}
            onBlur={onEditConfirm}
            onKeyDown={(event) => {
              if (event.key === 'Enter') onEditConfirm();
              if (event.key === 'Escape') onEditCancel();
            }}
            autoFocus
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Edit item"
          />
        ) : (
          <span className="flex-1 text-sm text-gray-700">{item.content}</span>
        )}
        <div className="flex items-center gap-2 text-gray-400 opacity-0 transition group-hover:opacity-100">
          {!isEditing ? (
            <button
              type="button"
              onClick={onEdit}
              className="rounded p-1 hover:bg-gray-100 hover:text-blue-500"
              aria-label="Edit item"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M16.862 3.487a1.875 1.875 0 112.651 2.652l-10.05 10.05a4.5 4.5 0 01-1.897 1.13l-2.685.766a.75.75 0 01-.927-.928l.766-2.684a4.5 4.5 0 011.13-1.897l10.012-10.05z" />
                <path d="M4.5 19.5h15a.75.75 0 010 1.5h-15a.75.75 0 010-1.5z" />
              </svg>
            </button>
          ) : null}
          <button
            type="button"
            onClick={onDelete}
            className="rounded p-1 hover:bg-gray-100 hover:text-red-500"
            aria-label="Delete item"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M9 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75V5h2.25a.75.75 0 010 1.5h-.31l-.81 11.387A2.25 2.25 0 0113.89 20H10.11a2.25 2.25 0 01-2.239-2.113L7.06 6.5H6.75a.75.75 0 010-1.5H9V3.75zm1.5.75v.5h3v-.5h-3zM8.56 6.5l.8 11.25a.75.75 0 00.75.7h3.78a.75.75 0 00.75-.7L15.44 6.5H8.56z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function TrackerListColumn({
  list,
  newItemValue,
  onNewItemChange,
  onAddItem,
  onDeleteList,
  onDeleteItem,
  onStartEdit,
  onEditConfirm,
  onEditCancel,
  onEditChange,
  editingItemId,
  editDraft,
}: {
  list: TrackerList;
  newItemValue: string;
  onNewItemChange: (value: string) => void;
  onAddItem: () => void;
  onDeleteList: () => void;
  onDeleteItem: (itemId: string) => void;
  onStartEdit: (item: TrackerItem) => void;
  onEditConfirm: (itemId: string) => void;
  onEditCancel: () => void;
  onEditChange: (value: string) => void;
  editingItemId: string | null;
  editDraft: string;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: list.id,
    data: { type: 'container', listId: list.id },
  });

  return (
    <SortableContext id={list.id} items={list.items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
      <article
        ref={setNodeRef}
        className={`flex h-full flex-col overflow-hidden rounded-xl border bg-gray-50 transition ${
          isOver ? 'border-purple-300 shadow-lg' : 'border-gray-100'
        }`}
      >
        <header className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-900">{list.name}</h3>
          <button
            type="button"
            onClick={onDeleteList}
            className="rounded p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
            aria-label={`Delete ${list.name}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M9 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75V5h2.25a.75.75 0 010 1.5h-.31l-.81 11.387A2.25 2.25 0 0113.89 20H10.11a2.25 2.25 0 01-2.239-2.113L7.06 6.5H6.75a.75.75 0 010-1.5H9V3.75zm1.5.75v.5h3v-.5h-3zM8.56 6.5l.8 11.25a.75.75 0 00.75.7h3.78a.75.75 0 00.75-.7L15.44 6.5H8.56z" />
            </svg>
          </button>
        </header>

        <div className="border-b border-gray-100 bg-white px-4 py-3">
          <div className="flex gap-2">
            <input
              value={newItemValue}
              onChange={(event) => onNewItemChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onAddItem();
              }}
              placeholder="New item"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={onAddItem}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="hide-scrollbar flex-1 space-y-3 overflow-y-auto p-4" style={{ height: '400px' }}>
          {list.items.length ? (
            list.items.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onDelete={() => onDeleteItem(item.id)}
                onEdit={() => onStartEdit(item)}
                isEditing={editingItemId === item.id}
                editContent={editingItemId === item.id ? editDraft : ''}
                onEditChange={onEditChange}
                onEditConfirm={() => onEditConfirm(item.id)}
                onEditCancel={onEditCancel}
              />
            ))
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-200 bg-white/70 p-6 text-center text-sm text-gray-500">
              Drag items here or add a new one to get started.
            </div>
          )}
        </div>
      </article>
    </SortableContext>
  );
}

export function ListTracker() {
  const [lists, setLists] = useState<TrackerList[]>([]);
  const [newListName, setNewListName] = useState('');
  const [newItems, setNewItems] = useState<NewItemState>({});
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(TRACKER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as TrackerList[];
        if (Array.isArray(parsed)) {
          setLists(parsed);
        }
      }
    } catch (error) {
      console.warn('ListTracker: unable to load stored lists', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TRACKER_STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const addList = useCallback(() => {
    const name = newListName.trim();
    if (!name) return;
    setLists((previous) => [...previous, createEmptyList(name)]);
    setNewListName('');
  }, [newListName]);

  const deleteList = useCallback((listId: string) => {
    setLists((previous) => previous.filter((list) => list.id !== listId));
    setNewItems((previous) => {
      const { [listId]: _, ...rest } = previous;
      return rest;
    });
  }, []);

  const addItem = useCallback(
    (listId: string) => {
      setLists((previous) => {
        const draft = newItems[listId]?.trim();
        if (!draft) return previous;
        return previous.map((list) =>
          list.id === listId ? { ...list, items: [...list.items, createTrackerItem(draft)] } : list,
        );
      });
      setNewItems((prior) => ({ ...prior, [listId]: '' }));
    },
    [newItems],
  );

  const deleteItem = useCallback((listId: string, itemId: string) => {
    setLists((previous) =>
      previous.map((list) =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter((item) => item.id !== itemId),
            }
          : list,
      ),
    );
  }, []);

  const startEdit = useCallback((_listId: string, item: TrackerItem) => {
    setEditingItemId(item.id);
    setEditDraft(item.content);
  }, []);

  const confirmEdit = useCallback(
    (listId: string, itemId: string) => {
      const draft = editDraft.trim();
      if (!draft) {
        setEditingItemId(null);
        setEditDraft('');
        return;
      }
      setLists((previous) =>
        previous.map((list) =>
          list.id === listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === itemId ? { ...item, content: draft } : item,
                ),
              }
            : list,
        ),
      );
      setEditingItemId(null);
      setEditDraft('');
    },
    [editDraft],
  );

  const cancelEdit = useCallback(() => {
    setEditingItemId(null);
    setEditDraft('');
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) return;

    setLists((previous) => {
      const activeList = findListByItemId(previous, activeId);
      const overList = findListByItemId(previous, overId) ?? previous.find((list) => list.id === overId);
      if (!activeList || !overList || activeList.id === overList.id) {
        return previous;
      }

      const activeItemIndex = activeList.items.findIndex((item) => item.id === activeId);
      const activeItem = activeList.items[activeItemIndex];
      if (!activeItem) return previous;

      const overIndex = overList.items.findIndex((item) => item.id === overId);
      const targetIndex = overIndex >= 0 ? overIndex : overList.items.length;

      return previous.map((list) => {
        if (list.id === activeList.id) {
          return { ...list, items: list.items.filter((item) => item.id !== activeId) };
        }
        if (list.id === overList.id) {
          const nextItems = [...list.items];
          nextItems.splice(targetIndex, 0, activeItem);
          return { ...list, items: nextItems };
        }
        return list;
      });
    });
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over) {
        return;
      }

      const activeId = String(active.id);
      const overId = String(over.id);

      setLists((previous) => {
        const activeList = findListByItemId(previous, activeId);
        const overList = findListByItemId(previous, overId) ?? previous.find((list) => list.id === overId);
        if (!activeList || !overList) {
          return previous;
        }

        if (activeList.id === overList.id) {
          const oldIndex = activeList.items.findIndex((item) => item.id === activeId);
          const overIndex = overList.items.findIndex((item) => item.id === overId);
          const newIndex = overIndex >= 0 ? overIndex : overList.items.length - 1;

          if (oldIndex !== newIndex && oldIndex >= 0 && newIndex >= 0) {
            return previous.map((list) =>
              list.id === activeList.id
                ? {
                    ...list,
                    items: arrayMove(list.items, oldIndex, newIndex),
                  }
                : list,
            );
          }
        }

        return previous;
      });

      // drag completed
    },
    [],
  );

  const listsWithFallback = useMemo(() => lists, [lists]);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Create a new list</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={newListName}
            onChange={(event) => setNewListName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') addList();
            }}
            placeholder="New list name"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={addList}
            className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Add List
          </button>
        </div>
      </section>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listsWithFallback.map((list) => (
            <TrackerListColumn
              key={list.id}
              list={list}
              newItemValue={newItems[list.id] ?? ''}
              onNewItemChange={(value) => setNewItems((previous) => ({ ...previous, [list.id]: value }))}
              onAddItem={() => addItem(list.id)}
              onDeleteList={() => deleteList(list.id)}
              onDeleteItem={(itemId) => deleteItem(list.id, itemId)}
              onStartEdit={(item) => startEdit(list.id, item)}
              onEditConfirm={(itemId) => confirmEdit(list.id, itemId)}
              onEditCancel={cancelEdit}
              onEditChange={setEditDraft}
              editingItemId={editingItemId}
              editDraft={editDraft}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
