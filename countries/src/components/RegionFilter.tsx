import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

import { ChevronDownIcon } from './icons.tsx';

interface RegionFilterProps {
  regions: string[];
  value: string;
  onChange: (value: string) => void;
}

interface Option {
  value: string;
  label: string;
}

export default function RegionFilter({ regions, value, onChange }: RegionFilterProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const listboxId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  const options: Option[] = [
    { value: '', label: 'All regions' },
    ...regions.map((region) => ({ value: region, label: region })),
  ];
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen)
      document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' });
  });

  const open = () => {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  };

  const select = (index: number) => {
    const option = options[index];
    if (option) onChange(option.value);
    setIsOpen(false);
  };

  const moveTo = (index: number) => {
    setActiveIndex(Math.min(Math.max(index, 0), options.length - 1));
  };

  const findByTypedChar = (char: string) => {
    const lowerChar = char.toLowerCase();
    const after = options.slice(activeIndex + 1);
    const before = options.slice(0, activeIndex + 1);
    const match = [...after, ...before].find((option) =>
      option.label.toLowerCase().startsWith(lowerChar)
    );
    return match ? options.indexOf(match) : -1;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const { key } = event;

    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
        event.preventDefault();
        open();
      }
      return;
    }

    if (key.length === 1 && key !== ' ') {
      const index = findByTypedChar(key);
      if (index >= 0) setActiveIndex(index);
      return;
    }

    const actions: Record<string, () => void> = {
      ArrowDown: () => moveTo(activeIndex + 1),
      ArrowUp: () => moveTo(activeIndex - 1),
      Home: () => moveTo(0),
      End: () => moveTo(options.length - 1),
      Enter: () => select(activeIndex),
      ' ': () => select(activeIndex),
      Escape: () => setIsOpen(false),
      Tab: () => select(activeIndex),
    };

    const action = actions[key];
    if (!action) return;
    if (key !== 'Tab') event.preventDefault();
    action();
  };

  return (
    <div ref={rootRef} className='relative w-50'>
      <span id={labelId} className='sr-only'>
        Filter by region
      </span>
      <div
        role='combobox'
        tabIndex={0}
        aria-labelledby={labelId}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        aria-activedescendant={isOpen ? optionId(activeIndex) : undefined}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
        onBlur={(event) => {
          if (!rootRef.current?.contains(event.relatedTarget)) setIsOpen(false);
        }}
        className='flex w-full cursor-pointer items-center justify-between surface py-4 pr-5 pl-6 text-sm select-none'
      >
        <span>{value || 'Filter by Region'}</span>
        <ChevronDownIcon className={`size-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      <ul
        id={listboxId}
        role='listbox'
        aria-labelledby={labelId}
        tabIndex={-1}
        hidden={!isOpen}
        className='absolute inset-x-0 top-full z-10 mt-1 max-h-72 overflow-y-auto surface py-4 text-sm'
      >
        {options.map((option, index) => (
          <li
            key={option.value || 'all'}
            id={optionId(index)}
            role='option'
            aria-selected={index === selectedIndex}
            onPointerMove={() => setActiveIndex(index)}
            onPointerDown={(event) => event.preventDefault()}
            onClick={() => select(index)}
            onKeyDown={handleKeyDown}
            className={`cursor-pointer px-6 py-1.5 ${index === activeIndex ? 'bg-black/5 dark:bg-white/10' : ''} ${index === selectedIndex ? 'font-semibold' : ''}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
