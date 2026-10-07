import { z } from 'zod';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const FILTERS = ['all', 'active', 'completed'] as const;
export type Filter = (typeof FILTERS)[number];

export const titleSchema = z.string().trim().min(1).max(200);
export const idSchema = z.uuid();

export const filterTodos = (todos: Todo[], filter: Filter) =>
  filter === 'all' ? todos : todos.filter((todo) => todo.completed === (filter === 'completed'));

export const itemsLeft = (todos: Todo[]) => todos.filter((todo) => !todo.completed).length;

export const isPermutation = (ids: string[], current: string[]) => {
  const set = new Set(ids);
  return (
    set.size === ids.length && ids.length === current.length && current.every((id) => set.has(id))
  );
};

export type TodoAction =
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: string; completed: boolean }
  | { type: 'delete'; id: string }
  | { type: 'clear' }
  | { type: 'reorder'; ids: string[] };

export function todosReducer(todos: Todo[], action: TodoAction): Todo[] {
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
