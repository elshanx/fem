'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  type FormEvent,
  type MouseEvent,
} from 'react';
import { saveInvoice } from '@/app/actions';
import { ArrowLeft } from '@/common/icons';
import Field, { AddressFields, PaymentTermsField } from '@/components/invoice-form/Field';
import FormActions from '@/components/invoice-form/FormActions';
import ItemList from '@/components/invoice-form/ItemList';
import type { InvoiceInput } from '@/lib/invoice';

interface Props {
  closeHref: string;
  today: string;
  invoice?: InvoiceInput & { id: string };
}

export default function InvoiceForm({ closeHref, today, invoice = undefined }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, formAction, pending] = useActionState(saveInvoice, undefined);
  const errors = state?.errors ?? {};
  const hasFieldErrors = Object.keys(errors).some((key) => key !== 'items');

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const close = () => router.replace(closeHref, { scroll: false });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { submitter } = event.nativeEvent as SubmitEvent;
    const formData = new FormData(event.currentTarget, submitter);
    startTransition(() => formAction(formData));
  };

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events -- backdrop click; Escape is handled by onCancel
    <dialog
      id='invoice-drawer'
      ref={dialogRef}
      aria-labelledby='invoice-form-title'
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={onBackdropClick}
      className='fixed top-topbar left-0 m-0 h-[calc(100dvh-var(--spacing-topbar))] max-h-none w-full max-w-none overflow-hidden bg-white text-body md:top-topbar-md md:h-[calc(100dvh-var(--spacing-topbar-md))] md:max-w-154 md:rounded-r-[1.25rem] lg:top-0 lg:left-sidebar lg:h-dvh dark:bg-navy-950'
    >
      <form noValidate onSubmit={onSubmit} className='flex h-full flex-col'>
        {invoice && <input type='hidden' name='id' value={invoice.id} />}

        <div className='relative flex-1 overflow-y-auto px-6 pt-8 pb-22 md:px-14 md:pt-14 md:pb-8'>
          <Link
            href={closeHref}
            replace
            scroll={false}
            className='inline-flex items-center gap-6 rounded-sm text-heading-s font-bold text-ink focus-ring transition-colors hover:text-gray-blue md:hidden dark:text-white dark:hover:text-gray-blue'
          >
            <ArrowLeft /> Go back
          </Link>
          <h2 id='invoice-form-title' className='mt-6 text-heading-m md:mt-0'>
            {invoice ? (
              <>
                Edit <span className='text-gray-blue'>#</span>
                {invoice.id}
              </>
            ) : (
              'New Invoice'
            )}
          </h2>

          <fieldset className='mt-6 md:mt-12'>
            <legend className='text-heading-s font-bold text-violet'>Bill From</legend>
            <div className='mt-6'>
              <AddressFields prefix='sender' values={invoice} errors={errors} />
            </div>
          </fieldset>

          <fieldset className='mt-10 md:mt-12'>
            <legend className='text-heading-s font-bold text-violet'>Bill To</legend>
            <div className='mt-6 grid gap-6'>
              <Field
                label="Client's Name"
                name='clientName'
                autoComplete='off'
                defaultValue={invoice?.clientName}
                error={errors.clientName}
              />
              <Field
                label="Client's Email"
                name='clientEmail'
                type='email'
                autoComplete='off'
                placeholder='e.g. email@example.com'
                defaultValue={invoice?.clientEmail}
                error={errors.clientEmail}
              />
              <AddressFields prefix='client' values={invoice} errors={errors} />
            </div>
          </fieldset>

          <div className='mt-10 grid gap-6 md:mt-12 md:grid-cols-2'>
            <Field
              label='Invoice Date'
              name='createdAt'
              type='date'
              defaultValue={invoice?.createdAt ?? today}
              error={errors.createdAt}
            />
            <PaymentTermsField
              defaultValue={invoice?.paymentTerms ?? '30'}
              error={errors.paymentTerms}
            />
            <Field
              label='Project Description'
              name='description'
              autoComplete='off'
              placeholder='e.g. Graphic Design Service'
              defaultValue={invoice?.description}
              error={errors.description}
              className='md:col-span-2'
            />
          </div>

          <ItemList initialItems={invoice?.items} errors={errors} />

          {(hasFieldErrors || errors.items) && (
            <div role='alert' className='mt-8 text-[0.625rem] font-semibold text-red'>
              {hasFieldErrors && <p>- All fields must be added</p>}
              {errors.items && <p>- {errors.items}</p>}
            </div>
          )}
        </div>

        <FormActions editing={Boolean(invoice)} pending={pending} onClose={close} />
      </form>
    </dialog>
  );
}
