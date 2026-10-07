import { FILTERS, type Filter } from '@/lib/todos';

const LABELS: Record<Filter, string> = { all: 'All', active: 'Active', completed: 'Completed' };

interface Props {
  filter: Filter;
  onChange: (filter: Filter) => void;
  className?: string;
}

export default function FilterTabs({ filter, onChange, className = '' }: Props) {
  return (
    <div role='group' aria-label='Filter todos' className={`gap-5 text-sm font-bold ${className}`}>
      {FILTERS.map((value) => (
        <button
          key={value}
          type='button'
          aria-pressed={filter === value}
          onClick={() => onChange(value)}
          className={`pt-0.5 ${filter === value ? 'cursor-pointer text-blue-500 focus-ring' : 'muted-link'}`}
        >
          {LABELS[value]}
        </button>
      ))}
    </div>
  );
}
