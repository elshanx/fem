import 'server-only';
import prisma from '@/lib/db';
import { PAGE_SIZE, buildWhere, type JobFilters } from '@/lib/filters';

export async function findJobs(filters: JobFilters) {
  const limit = PAGE_SIZE * filters.page;
  // One extra row tells us whether "Load More" has anything left to show.
  const rows = await prisma.job.findMany({
    where: buildWhere(filters),
    orderBy: { id: 'asc' },
    take: limit + 1,
  });
  return { jobs: rows.slice(0, limit), hasMore: rows.length > limit };
}

export function getJob(id: number) {
  return Number.isSafeInteger(id) && id > 0 ? prisma.job.findUnique({ where: { id } }) : null;
}

export type Job = NonNullable<Awaited<ReturnType<typeof getJob>>>;
