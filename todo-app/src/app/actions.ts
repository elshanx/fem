'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/lib/db';
import { ensureOwnerId, getOwnerId } from '@/lib/owner';
import { idSchema, isPermutation, titleSchema } from '@/lib/todos';

async function ownedTodo(id: string) {
  const ownerId = await getOwnerId();
  return ownerId && idSchema.safeParse(id).success ? { id, ownerId } : null;
}

export async function addTodo(id: string, rawTitle: string) {
  const title = titleSchema.safeParse(rawTitle);
  if (!title.success || !idSchema.safeParse(id).success) return;
  const ownerId = await ensureOwnerId();
  const { _max: max } = await prisma.todo.aggregate({
    where: { ownerId },
    _max: { position: true },
  });
  await prisma.todo.createMany({
    data: { id, ownerId, title: title.data, position: (max.position ?? -1) + 1 },
    skipDuplicates: true,
  });
  revalidatePath('/');
}

export async function toggleTodo(id: string, completed: boolean) {
  const where = await ownedTodo(id);
  if (!where || typeof completed !== 'boolean') return;
  await prisma.todo.updateMany({ where, data: { completed } });
  revalidatePath('/');
}

export async function deleteTodo(id: string) {
  const where = await ownedTodo(id);
  if (!where) return;
  await prisma.todo.deleteMany({ where });
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
