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

// True when `ids` is exactly `current` in some order: no duplicates, nothing missing or extra.
export const isPermutation = (ids: string[], current: string[]) => {
  const set = new Set(ids);
  return (
    set.size === ids.length && ids.length === current.length && current.every((id) => set.has(id))
  );
};
