const numberFormat = new Intl.NumberFormat('en-US');

export const formatNumber = (value: number): string => numberFormat.format(value);

export const formatList = (items: string[] | undefined): string =>
  items?.length ? items.join(', ') : 'N/A';
