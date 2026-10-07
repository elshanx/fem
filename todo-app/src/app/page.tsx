import ThemeToggle from '@/components/ThemeToggle';
import TodoApp from '@/components/TodoApp';
import prisma from '@/lib/db';
import { getOwnerId } from '@/lib/owner';

export default async function Home() {
  const ownerId = await getOwnerId();
  const todos = ownerId
    ? await prisma.todo.findMany({
        where: { ownerId },
        orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
        select: { id: true, title: true, completed: true },
      })
    : [];

  return (
    <>
      <div className='hero absolute inset-x-0 top-0 h-50 md:h-75' />
      <main className='relative mx-auto max-w-147 px-6 pt-10 pb-16 md:pt-[4.375rem]'>
        <header className='flex items-center justify-between'>
          <h1 className='pt-1.5 text-[1.75rem] leading-none font-bold tracking-[0.4em] text-white md:text-[2.5rem]'>
            TODO
          </h1>
          <ThemeToggle />
        </header>
        <TodoApp todos={todos} />
      </main>
    </>
  );
}
