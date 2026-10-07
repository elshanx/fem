'use client';

import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useRef, type MouseEvent } from 'react';
import TodoItem from '@/components/TodoItem';
import type { Todo } from '@/lib/todos';
import useHydrated from '@/lib/use-hydrated';

interface Props {
  todos: Todo[];
  saved: Set<string>;
  sortable: boolean;
  emptyText: string;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onReorder: (ids: string[]) => void;
}

export default function TodoList({
  todos,
  saved,
  sortable,
  emptyText,
  onToggle,
  onDelete,
  onReorder,
}: Props) {
  const hydrated = useHydrated();
  const dragging = useRef(false);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setTimeout(() => {
      dragging.current = false;
    });
    if (!over || active.id === over.id) return;
    const ids = todos.map((todo) => todo.id);
    onReorder(arrayMove(ids, ids.indexOf(String(active.id)), ids.indexOf(String(over.id))));
  };

  // The mouseup ending a drag also clicks the row, which would toggle it.
  const ignoreClickAfterDrag = (event: MouseEvent) => {
    if (!dragging.current) return;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <DndContext
      id='todo-list'
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={() => {
        dragging.current = true;
      }}
      onDragEnd={onDragEnd}
      onDragCancel={() => {
        dragging.current = false;
      }}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <ul data-hydrated={hydrated || undefined} onClickCapture={ignoreClickAfterDrag}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              sortable={sortable}
              pending={!saved.has(todo.id)}
              onToggle={() => onToggle(todo)}
              onDelete={() => onDelete(todo)}
            />
          ))}
          {todos.length === 0 && (
            <li className='border-b border-purple-100 px-6 pt-6 pb-5 text-center text-xs text-gray-600 md:text-lg dark:border-purple-800 dark:text-purple-600'>
              {emptyText}
            </li>
          )}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
