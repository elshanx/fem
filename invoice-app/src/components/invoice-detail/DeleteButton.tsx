'use client';

import { useId, useRef } from 'react';
import { deleteInvoice } from '@/app/actions';
import SubmitButton from '@/components/SubmitButton';

export default function DeleteButton({ id }: { id: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button type='button' onClick={() => dialogRef.current?.showModal()} className='btn-danger'>
        Delete
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className='confirm-dialog m-auto w-[calc(100%-3rem)] max-w-120 card p-8 md:p-12'
      >
        <h2 id={titleId} className='text-heading-m'>
          Confirm Deletion
        </h2>
        <p className='mt-2 leading-5.5 text-gray md:mt-3 dark:text-lavender'>
          Are you sure you want to delete invoice #{id}? This action cannot be undone.
        </p>
        <form action={deleteInvoice} className='mt-4 flex justify-end gap-2'>
          <input type='hidden' name='id' value={id} />
          <button
            type='button'
            // eslint-disable-next-line jsx-a11y/no-autofocus -- safe default in a destructive confirm
            autoFocus
            onClick={() => dialogRef.current?.close()}
            className='btn-light'
          >
            Cancel
          </button>
          <SubmitButton className='btn-danger'>Delete</SubmitButton>
        </form>
      </dialog>
    </>
  );
}
