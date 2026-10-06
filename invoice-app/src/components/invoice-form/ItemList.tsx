'use client';

import { useId, useState, type ComponentProps } from 'react';
import { Plus, Trash } from '@/common/icons';
import { formatAmount, toCents, type FieldErrors, type ItemInput } from '@/lib/invoice';

interface ItemFieldProps extends ComponentProps<'input'> {
  label: string;
  invalid: boolean;
  inputClassName?: string;
}

function ItemField({
  label,
  invalid,
  className = '',
  inputClassName = '',
  ...input
}: ItemFieldProps) {
  const id = useId();
  return (
    <div className={`grid gap-2.5 ${className}`}>
      <label htmlFor={id} className='md:sr-only'>
        {label}
      </label>
      <input
        id={id}
        aria-invalid={invalid || undefined}
        className={`field ${inputClassName} ${invalid ? 'border-red! dark:border-red!' : ''}`}
        {...input}
      />
    </div>
  );
}

type Item = ItemInput & { key: string };

const newItem = (item: ItemInput = { name: '', quantity: '1', price: '' }): Item => ({
  ...item,
  key: crypto.randomUUID(),
});

const rowTotal = ({ quantity, price }: ItemInput) => {
  const q = Number(quantity);
  const p = Number(price);
  return Number.isFinite(q) && Number.isFinite(p) ? formatAmount(q * toCents(p)) : '0.00';
};

export default function ItemList({
  initialItems = undefined,
  errors,
}: {
  initialItems?: ItemInput[];
  errors: FieldErrors;
}) {
  const [items, setItems] = useState(() => (initialItems ?? [undefined]).map(newItem));

  const updateItem = (key: string, patch: Partial<ItemInput>) =>
    setItems((list) => list.map((item) => (item.key === key ? { ...item, ...patch } : item)));

  return (
    <fieldset className='mt-16 md:mt-9'>
      <legend className='text-lg font-bold text-[#777f98]'>Item List</legend>
      <div
        aria-hidden='true'
        className='mt-4 hidden grid-cols-[1fr_3rem_6.25rem_4rem_1rem] gap-4 md:grid'
      >
        <span>Item Name</span>
        <span>Qty.</span>
        <span>Price</span>
        <span>Total</span>
      </div>
      <ul className='mt-6 space-y-12 md:mt-4 md:space-y-4'>
        {items.map((item, i) => (
          <li
            key={item.key}
            className='grid grid-cols-[4rem_6.25rem_1fr_auto] items-end gap-4 md:grid-cols-[1fr_3rem_6.25rem_4rem_1rem] md:items-center'
          >
            <ItemField
              label='Item Name'
              name='itemName'
              value={item.name}
              onChange={(e) => updateItem(item.key, { name: e.target.value })}
              invalid={Boolean(errors[`items.${i}.name`])}
              className='col-span-4 md:col-span-1'
            />
            <ItemField
              label='Qty.'
              name='itemQuantity'
              inputMode='numeric'
              value={item.quantity}
              onChange={(e) => updateItem(item.key, { quantity: e.target.value })}
              invalid={Boolean(errors[`items.${i}.quantity`])}
              inputClassName='px-0 text-center'
            />
            <ItemField
              label='Price'
              name='itemPrice'
              inputMode='decimal'
              value={item.price}
              onChange={(e) => updateItem(item.key, { price: e.target.value })}
              invalid={Boolean(errors[`items.${i}.price`])}
              inputClassName='px-4'
            />
            <span className='grid gap-2.5'>
              <span className='md:sr-only'>Total</span>
              <output className='flex h-12 items-center text-heading-s font-bold text-gray'>
                {rowTotal(item)}
              </output>
            </span>
            <button
              type='button'
              aria-label={`Remove ${item.name || `item ${i + 1}`}`}
              onClick={() => setItems((list) => list.filter(({ key }) => key !== item.key))}
              className='grid h-12 cursor-pointer place-items-center rounded-sm text-gray focus-ring transition-colors hover:text-red'
            >
              <Trash />
            </button>
          </li>
        ))}
      </ul>
      <button
        type='button'
        onClick={() => setItems((list) => [...list, newItem()])}
        className='mt-12 btn-light w-full gap-1 md:mt-4.5'
      >
        <Plus /> Add New Item
      </button>
    </fieldset>
  );
}
