'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { KeyboardEvent } from 'react';
import { Check, Cross } from '@/common/icons';
import type { Todo } from '@/lib/todos';

interface Props {
  todo: Todo;
  sortable: boolean;
  pending: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const gradient = 'bg-linear-to-br from-check-from to-check-to';

export default function TodoItem({ todo, sortable, pending, onToggle, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo.id,
    disabled: !sortable,
    attributes: { role: 'listitem' },
  });

  // Space/Enter on the checkbox or delete button must not start a keyboard drag.
  const onKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.target === event.currentTarget) listeners?.onKeyDown?.(event);
  };

  return (
    // The row itself is the drag handle (dnd-kit makes it focusable for keyboard sorting).
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        // dnd-kit's inline transition would override the enter animation from globals.css; chain both.
        transition: [transition, 'var(--enter-transition, opacity 0s)'].filter(Boolean).join(', '),
      }}
      {...attributes}
      {...listeners}
      onKeyDown={onKeyDown}
      className={`group relative flex min-h-13 items-center gap-3 border-b border-purple-100 bg-white px-5 focus-ring first:rounded-t-md md:min-h-16 md:gap-6 md:px-6 dark:border-purple-800 dark:bg-navy-900 ${
        sortable ? 'cursor-grab active:cursor-grabbing' : ''
      } ${isDragging ? 'z-10 rounded-md opacity-90 shadow-card dark:shadow-card-dark' : ''}`}
    >
      <label
        htmlFor={`todo-${todo.id}`}
        className='group/check flex min-w-0 flex-1 cursor-pointer items-center gap-3 md:gap-6'
      >
        <input
          id={`todo-${todo.id}`}
          type='checkbox'
          className='peer sr-only'
          checked={todo.completed}
          disabled={pending}
          onChange={onToggle}
        />
        <span
          aria-hidden
          className='grid size-5 shrink-0 rounded-full bg-purple-100 p-px group-hover/check:bg-linear-to-br group-hover/check:from-check-from group-hover/check:to-check-to peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue-500 md:size-6 dark:bg-purple-800'
        >
          <span
            className={`grid size-full place-items-center rounded-full ${
              todo.completed ? gradient : 'bg-white dark:bg-navy-900'
            }`}
          >
            {todo.completed && <Check className='w-2 md:w-2.75' />}
          </span>
        </span>
        <span className='min-w-0 flex-1 pt-4 pb-3 text-xs wrap-anywhere transition-colors peer-checked:text-gray-300 peer-checked:line-through md:pt-5 md:pb-4 md:text-lg dark:peer-checked:text-purple-700'>
          {todo.title}
        </span>
      </label>
      <button
        type='button'
        aria-label={`Delete "${todo.title}"`}
        disabled={pending}
        onClick={onDelete}
        className='-mr-1 grid size-6 shrink-0 cursor-pointer place-items-center rounded text-gray-600 focus-ring transition hover:text-navy-850 focus-visible:opacity-100 dark:text-purple-600 dark:hover:text-purple-100 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100 pointer-fine:group-has-focus-visible:opacity-100 [&_svg]:size-3 md:[&_svg]:size-4.5'
      >
        <Cross />
      </button>
    </li>
  );
}
