import { useId, type ComponentProps } from 'react';
import { ArrowDown } from '@/common/icons';
import { PAYMENT_TERMS, type FieldErrors, type InvoiceInput } from '@/lib/invoice';

interface FieldProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

export default function Field({ label, error = '', className = '', ...input }: FieldProps) {
  const id = useId();
  return (
    <div className={`grid content-start gap-2.5 ${className}`}>
      <label
        htmlFor={id}
        className={`flex justify-between gap-2 ${error ? 'text-red' : 'text-gray-blue dark:text-lavender'}`}
      >
        {label}
        {error && <span className='text-[0.625rem] font-semibold'>{error}</span>}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        className={`field ${error ? 'border-red! dark:border-red!' : ''}`}
        {...input}
      />
    </div>
  );
}

export function AddressFields({
  prefix,
  values,
  errors,
}: {
  prefix: 'sender' | 'client';
  values: InvoiceInput | undefined;
  errors: FieldErrors;
}) {
  const field = (key: 'Street' | 'City' | 'PostCode' | 'Country') => ({
    name: `${prefix}${key}`,
    defaultValue: values?.[`${prefix}${key}`],
    error: errors[`${prefix}${key}`],
  });
  return (
    <div className='grid grid-cols-2 gap-6 md:grid-cols-3'>
      <Field
        label='Street Address'
        autoComplete='street-address'
        className='col-span-2 md:col-span-3'
        {...field('Street')}
      />
      <Field label='City' autoComplete='address-level2' {...field('City')} />
      <Field label='Post Code' autoComplete='postal-code' {...field('PostCode')} />
      <Field
        label='Country'
        autoComplete='country-name'
        className='col-span-2 md:col-span-1'
        {...field('Country')}
      />
    </div>
  );
}

export function PaymentTermsField({
  defaultValue,
  error = '',
}: {
  defaultValue: string;
  error?: string;
}) {
  return (
    <label htmlFor='paymentTerms' className='grid content-start gap-2.5'>
      <span className={error ? 'text-red' : 'text-gray-blue dark:text-lavender'}>
        Payment Terms
      </span>
      <span className='relative'>
        <select
          id='paymentTerms'
          name='paymentTerms'
          defaultValue={defaultValue}
          className='field cursor-pointer appearance-none pr-12'
        >
          {PAYMENT_TERMS.map((days) => (
            <option key={days} value={days}>
              Net {days} Day{days === 1 ? '' : 's'}
            </option>
          ))}
        </select>
        <ArrowDown className='pointer-events-none absolute top-1/2 right-4 -translate-y-1/2' />
      </span>
    </label>
  );
}
