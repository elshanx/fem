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
import {
  useOptimistic,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
  type MouseEvent,
} from 'react';
import { addTodo, clearCompleted, deleteTodo, reorderTodos, toggleTodo } from '@/app/actions';
import FilterTabs from '@/components/FilterTabs';
import TodoItem from '@/components/TodoItem';
import { filterTodos, itemsLeft, titleSchema, type Filter, type Todo } from '@/lib/todos';

type Action =
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: string; completed: boolean }
  | { type: 'delete'; id: string }
  | { type: 'clear' }
  | { type: 'reorder'; ids: string[] };

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [...todos, action.todo];
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, completed: action.completed } : todo
      );
    case 'delete':
      return todos.filter((todo) => todo.id !== action.id);
    case 'clear':
      return todos.filter((todo) => !todo.completed);
    case 'reorder': {
      const byId = new Map(todos.map((todo) => [todo.id, todo]));
      return action.ids.flatMap((id) => byId.get(id) ?? []);
    }
    default:
      return todos;
  }
}

const subscribe = () => () => {};

export default function TodoApp({ todos }: { todos: Todo[] }) {
  const [list, dispatch] = useOptimistic(todos, reducer);
  const [filter, setFilter] = useState<Filter>('all');
  const [, startTransition] = useTransition();
  const justDragged = useRef(false);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // False during SSR and hydration, so rows already on the page don't play the enter animation.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  // Rows the server hasn't confirmed yet (optimistic adds) can't be toggled or deleted.
  const saved = new Set(todos.map((todo) => todo.id));
  const visible = filterTodos(list, filter);
  const left = itemsLeft(list);
  // Reordering a filtered view would shuffle hidden items, so only "All" is sortable.
  const sortable = filter === 'all';

  const run = (action: Action, request: () => Promise<void>) =>
    startTransition(async () => {
      dispatch(action);
      await request();
    });

  const add = async (formData: FormData) => {
    const title = titleSchema.safeParse(formData.get('title'));
    if (!title.success) return;
    const id = crypto.randomUUID();
    dispatch({ type: 'add', todo: { id, title: title.data, completed: false } });
    await addTodo(id, title.data);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    // The mouseup that ends a drag also clicks the row; swallow that click.
    setTimeout(() => {
      justDragged.current = false;
    });
    if (!over || active.id === over.id) return;
    const ids = list.map((todo) => todo.id);
    const next = arrayMove(ids, ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));
    run({ type: 'reorder', ids: next }, () => reorderTodos(next));
  };

  const swallowDragClick = (event: MouseEvent) => {
    if (!justDragged.current) return;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <>
      <form
        action={add}
        className='mt-8 flex items-center gap-3 card px-5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 md:mt-10 md:gap-6 md:px-6'
      >
        <span
          aria-hidden
          className='size-5 shrink-0 rounded-full border border-purple-100 md:size-6 dark:border-purple-800'
        />
        <input
          aria-label='Create a new todo'
          name='title'
          required
          maxLength={200}
          autoComplete='off'
          placeholder='Create a new todo…'
          className='h-12 w-full bg-transparent pt-1 text-xs caret-blue-500 outline-none placeholder:text-gray-600 md:h-16 md:text-lg dark:placeholder:text-purple-600'
        />
      </form>

      <section aria-label='Todos' className='mt-4 card md:mt-6'>
        <DndContext
          id='todo-list'
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragStart={() => {
            justDragged.current = true;
          }}
          onDragEnd={onDragEnd}
          onDragCancel={() => {
            justDragged.current = false;
          }}
        >
          <SortableContext items={visible} strategy={verticalListSortingStrategy}>
            <ul data-hydrated={hydrated || undefined} onClickCapture={swallowDragClick}>
              {visible.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  sortable={sortable}
                  pending={!saved.has(todo.id)}
                  onToggle={() =>
                    run({ type: 'toggle', id: todo.id, completed: !todo.completed }, () =>
                      toggleTodo(todo.id, !todo.completed)
                    )
                  }
                  onDelete={() => run({ type: 'delete', id: todo.id }, () => deleteTodo(todo.id))}
                />
              ))}
              {visible.length === 0 && (
                <li className='border-b border-purple-100 px-6 pt-6 pb-5 text-center text-xs text-gray-600 md:text-lg dark:border-purple-800 dark:text-purple-600'>
                  {filter === 'all' ? 'Nothing to do yet' : `No ${filter} todos`}
                </li>
              )}
            </ul>
          </SortableContext>
        </DndContext>

        <div className='flex items-center justify-between px-5 pt-4.5 pb-4 text-xs text-gray-600 md:px-6 md:text-sm dark:text-purple-600'>
          <p aria-live='polite' className='pt-0.5'>
            {left} {left === 1 ? 'item' : 'items'} left
          </p>
          <FilterTabs filter={filter} onChange={setFilter} className='hidden md:flex' />
          <button
            type='button'
            onClick={() => run({ type: 'clear' }, clearCompleted)}
            className='muted-link pt-0.5'
          >
            Clear Completed
          </button>
        </div>
      </section>

      <FilterTabs
        filter={filter}
        onChange={setFilter}
        className='mt-4 flex justify-center card py-4 md:hidden'
      />

      <p className='mt-10 text-center text-sm text-gray-600 md:mt-12 dark:text-purple-600'>
        {sortable ? 'Drag and drop to reorder list' : 'Switch to All to reorder the list'}
      </p>
    </>
  );
}
