'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/db';
import {
  draftRecord,
  generateId,
  ID_PATTERN,
  parseDate,
  readInvoiceForm,
  toIsoDate,
  validateInvoice,
  type FieldErrors,
  type InvoiceRecord,
  type Status,
} from '@/lib/invoice';

export type FormState = { errors: FieldErrors } | undefined;

const isUniqueViolation = (err: unknown) =>
  err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002';

async function createWithFreshId(record: InvoiceRecord, status: Status) {
  const { items, ...fields } = record;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop -- retry only on id collision
      return await prisma.invoice.create({
        data: { ...fields, id: generateId(), status, items: { create: items } },
      });
    } catch (err) {
      if (!isUniqueViolation(err)) throw err;
    }
  }
  throw new Error('Could not allocate an invoice id');
}

const readId = (formData: FormData) => {
  const id = formData.get('id');
  return typeof id === 'string' && ID_PATTERN.test(id) ? id : null;
};

export async function saveInvoice(_prev: FormState, formData: FormData): Promise<FormState> {
  const input = readInvoiceForm(formData);
  const id = readId(formData);

  if (!id && formData.get('intent') === 'draft') {
    await createWithFreshId(draftRecord(input, parseDate(toIsoDate(new Date()))), 'draft');
    revalidatePath('/');
    return redirect('/');
  }

  const result = validateInvoice(input);
  if (!result.ok) return { errors: result.errors };

  if (!id) {
    await createWithFreshId(result.record, 'pending');
    revalidatePath('/');
    return redirect('/');
  }

  const existing = await prisma.invoice.findUnique({ where: { id }, select: { status: true } });
  if (!existing) return redirect('/');

  const { items, ...fields } = result.record;
  await prisma.invoice.update({
    where: { id },
    data: {
      ...fields,
      status: existing.status === 'draft' ? 'pending' : existing.status,
      items: { deleteMany: {}, create: items },
    },
  });
  revalidatePath('/');
  revalidatePath(`/invoice/${id}`);
  return redirect(`/invoice/${id}`);
}

export async function markAsPaid(formData: FormData) {
  const id = readId(formData);
  if (!id) return;
  await prisma.invoice.updateMany({ where: { id, status: 'pending' }, data: { status: 'paid' } });
  revalidatePath('/');
  revalidatePath(`/invoice/${id}`);
}

export async function deleteInvoice(formData: FormData) {
  const id = readId(formData);
  if (id) await prisma.invoice.deleteMany({ where: { id } });
  revalidatePath('/');
  redirect('/');
}
