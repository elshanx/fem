'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import prisma from '@/lib/db';
import { ensureOwnerId, getOwnerId } from '@/lib/owner';
import { idSchema, isPermutation, titleSchema } from '@/lib/todos';

export async function addTodo(formData: FormData) {
  const title = titleSchema.safeParse(formData.get('title'));
  if (!title.success) return;
  const ownerId = await ensureOwnerId();
  const last = await prisma.todo.findFirst({
    where: { ownerId },
    orderBy: { position: 'desc' },
    select: { position: true },
  });
  await prisma.todo.create({
    data: { ownerId, title: title.data, position: (last?.position ?? -1) + 1 },
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
