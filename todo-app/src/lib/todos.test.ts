import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  filterTodos,
  isPermutation,
  itemsLeft,
  titleSchema,
  todosReducer,
  type Todo,
} from './todos.ts';

const todos: Todo[] = [
  { id: 'a', title: 'Jog', completed: true },
  { id: 'b', title: 'Read', completed: false },
  { id: 'c', title: 'Cook', completed: false },
];

test('filterTodos', () => {
  assert.deepEqual(filterTodos(todos, 'all'), todos);
  assert.deepEqual(
    filterTodos(todos, 'active').map((t) => t.id),
    ['b', 'c']
  );
  assert.deepEqual(
    filterTodos(todos, 'completed').map((t) => t.id),
    ['a']
  );
});

test('itemsLeft counts incomplete todos', () => {
  assert.equal(itemsLeft(todos), 2);
  assert.equal(itemsLeft([]), 0);
});

test('titleSchema trims and rejects blank or too long titles', () => {
  assert.equal(titleSchema.parse('  Jog  '), 'Jog');
  assert.equal(titleSchema.safeParse('   ').success, false);
  assert.equal(titleSchema.safeParse(null).success, false);
  assert.equal(titleSchema.safeParse('x'.repeat(201)).success, false);
});

test('isPermutation', () => {
  assert.equal(isPermutation(['c', 'a', 'b'], ['a', 'b', 'c']), true);
  assert.equal(isPermutation(['a', 'b'], ['a', 'b', 'c']), false);
  assert.equal(isPermutation(['a', 'a', 'b'], ['a', 'b', 'c']), false);
  assert.equal(isPermutation(['a', 'b', 'x'], ['a', 'b', 'c']), false);
});

test('todosReducer', () => {
  const ids = (list: Todo[]) => list.map((t) => t.id);
  const added = todosReducer(todos, {
    type: 'add',
    todo: { id: 'd', title: 'Nap', completed: false },
  });
  assert.deepEqual(ids(added), ['a', 'b', 'c', 'd']);
  const toggled = todosReducer(todos, { type: 'toggle', id: 'b', completed: true });
  assert.equal(toggled[1].completed, true);
  assert.equal(todos[1].completed, false, 'does not mutate');
  assert.deepEqual(ids(todosReducer(todos, { type: 'delete', id: 'b' })), ['a', 'c']);
  assert.deepEqual(ids(todosReducer(todos, { type: 'clear' })), ['b', 'c']);
  assert.deepEqual(ids(todosReducer(todos, { type: 'reorder', ids: ['c', 'a', 'b'] })), [
    'c',
    'a',
    'b',
  ]);
});
