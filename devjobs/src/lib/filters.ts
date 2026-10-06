import type { Prisma } from '@/generated/prisma/client';

export const PAGE_SIZE = 12;
const MAX_PAGE = 100;
const MAX_TERM_LENGTH = 100;

export type SearchParams = Record<string, string | string[] | undefined>;

export interface JobFilters {
  title: string;
  location: string;
  fullTime: boolean;
  page: number;
}

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

const term = (value: string | string[] | undefined) =>
  (first(value) ?? '').trim().slice(0, MAX_TERM_LENGTH);

export function parseFilters(searchParams: SearchParams): JobFilters {
  const page = Number.parseInt(first(searchParams.page) ?? '', 10);
  return {
    title: term(searchParams.title),
    location: term(searchParams.location),
    fullTime: first(searchParams.fullTime) === 'on',
    page: Number.isFinite(page) ? Math.min(Math.max(page, 1), MAX_PAGE) : 1,
  };
}

export function buildWhere({ title, location, fullTime }: JobFilters): Prisma.JobWhereInput {
  return {
    ...(title && {
      OR: [
        { position: { contains: title, mode: 'insensitive' } },
        { company: { contains: title, mode: 'insensitive' } },
      ],
    }),
    ...(location && { location: { contains: location, mode: 'insensitive' } }),
    ...(fullTime && { contract: 'Full Time' }),
  };
}

export function toQueryString({ title, location, fullTime, page }: JobFilters) {
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  if (location) params.set('location', location);
  if (fullTime) params.set('fullTime', 'on');
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `?${query}` : '';
}
