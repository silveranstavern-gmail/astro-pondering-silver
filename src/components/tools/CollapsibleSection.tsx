import type { PropsWithChildren, ReactNode } from 'react';
import { useId } from 'react';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  description?: ReactNode;
  className?: string;
}

export function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  description,
  className = '',
  children,
}: PropsWithChildren<CollapsibleSectionProps>) {
  const panelId = useId();

  return (
    <section className={`rounded-2xl bg-white shadow-md ${className}`.trim()}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 text-left"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          ) : null}
        </div>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 15.75a.75.75 0 01-.53-.22l-5-5a.75.75 0 011.06-1.06L12 13.94l4.47-4.47a.75.75 0 111.06 1.06l-5 5a.75.75 0 01-.53.22z" />
          </svg>
        </span>
      </button>
      <div
        id={panelId}
        hidden={!isOpen}
        className="px-5 pb-6 pt-4"
      >
        {children}
      </div>
    </section>
  );
}
