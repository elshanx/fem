import { SearchIcon } from './icons.tsx';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label
      htmlFor='country-search'
      className='flex w-full items-center gap-6 surface px-8 focus-within:ring-2 focus-within:ring-current sm:max-w-120'
    >
      <SearchIcon className='size-4 shrink-0 text-grey-400 dark:text-white' />
      <span className='sr-only'>Search for a country</span>
      <input
        id='country-search'
        type='search'
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder='Search for a country…'
        autoComplete='off'
        className='w-full bg-transparent py-4 text-sm outline-none placeholder:text-grey-400 dark:placeholder:text-white'
      />
    </label>
  );
}
