'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/lib/db';
import { ensureOwnerId, getOwnerId } from '@/lib/owner';
import { idSchema, isPermutation, titleSchema } from '@/lib/todos';

// The client picks the id so its optimistic row keeps the same React key once saved.
export async function addTodo(id: string, rawTitle: string) {
  const title = titleSchema.safeParse(rawTitle);
  if (!title.success || !idSchema.safeParse(id).success) return;
  const ownerId = await ensureOwnerId();
  const last = await prisma.todo.findFirst({
    where: { ownerId },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  // skipDuplicates makes a replayed submit a no-op instead of a unique-key error.
  await prisma.todo.createMany({
    data: { id, ownerId, title: title.data, position: (last?.position ?? -1) + 1 },
    skipDuplicates: true,
  });
  revalidatePath('/');
}

export async function toggleTodo(id: string, completed: boolean) {
  const ownerId = await getOwnerId();
  if (!ownerId || !idSchema.safeParse(id).success || typeof completed !== 'boolean') return;
  await prisma.todo.updateMany({ where: { id, ownerId }, data: { completed } });
  revalidatePath('/');
}

export async function deleteTodo(id: string) {
  const ownerId = await getOwnerId();
  if (!ownerId || !idSchema.safeParse(id).success) return;
  await prisma.todo.deleteMany({ where: { id, ownerId } });
  revalidatePath('/');
}

export async function clearCompleted() {
  const ownerId = await getOwnerId();
  if (!ownerId) return;
  await prisma.todo.deleteMany({ where: { ownerId, completed: true } });
  revalidatePath('/');
}

export async function reorderTodos(ids: string[]) {
  const ownerId = await getOwnerId();
  const parsed = z.array(idSchema).max(1000).safeParse(ids);
  if (!ownerId || !parsed.success) return;
  const current = await prisma.todo.findMany({ where: { ownerId }, select: { id: true } });
  // A stale order (an add or delete landed meanwhile) is dropped; revalidation restores the truth.
  if (
    !isPermutation(
      parsed.data,
      current.map((todo) => todo.id)
    )
  )
    return;
  await prisma.$transaction(
    parsed.data.map((id, position) =>
      prisma.todo.updateMany({ where: { id, ownerId }, data: { position } })
    )
  );
  revalidatePath('/');
}
