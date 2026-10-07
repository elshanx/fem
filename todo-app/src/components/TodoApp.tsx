'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { addTodo, clearCompleted, deleteTodo, reorderTodos, toggleTodo } from '@/app/actions';
import FilterTabs from '@/components/FilterTabs';
import NewTodoForm from '@/components/NewTodoForm';
import TodoList from '@/components/TodoList';
import {
  filterTodos,
  itemsLeft,
  todosReducer,
  type Filter,
  type Todo,
  type TodoAction,
} from '@/lib/todos';

export default function TodoApp({ todos }: { todos: Todo[] }) {
  const [list, dispatch] = useOptimistic(todos, todosReducer);
  const [filter, setFilter] = useState<Filter>('all');
  const [, startTransition] = useTransition();

  const left = itemsLeft(list);
  const sortable = filter === 'all';

  const run = (action: TodoAction, request: () => Promise<void>) =>
    startTransition(async () => {
      dispatch(action);
      await request();
    });

  const add = (title: string) => {
    const id = crypto.randomUUID();
    run({ type: 'add', todo: { id, title, completed: false } }, () => addTodo(id, title));
  };

  return (
    <>
      <NewTodoForm onAdd={add} />

      <section aria-label='Todos' className='mt-4 card md:mt-6'>
        <TodoList
          todos={filterTodos(list, filter)}
          saved={new Set(todos.map((todo) => todo.id))}
          sortable={sortable}
          emptyText={filter === 'all' ? 'Nothing to do yet' : `No ${filter} todos`}
          onToggle={({ id, completed }) =>
            run({ type: 'toggle', id, completed: !completed }, () => toggleTodo(id, !completed))
          }
          onDelete={({ id }) => run({ type: 'delete', id }, () => deleteTodo(id))}
          onReorder={(ids) => run({ type: 'reorder', ids }, () => reorderTodos(ids))}
        />

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
