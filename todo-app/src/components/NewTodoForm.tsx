import { titleSchema } from '@/lib/todos';

export default function NewTodoForm({ onAdd }: { onAdd: (title: string) => void }) {
  const submit = (formData: FormData) => {
    const title = titleSchema.safeParse(formData.get('title'));
    if (title.success) onAdd(title.data);
  };

  return (
    <form
      action={submit}
      className='mt-8 flex items-center gap-3 card px-5 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-500 md:mt-10 md:gap-6 md:px-6'
    >
      <span
        aria-hidden
        className='size-5 shrink-0 rounded-full border border-purple-100 md:size-6 dark:border-purple-800'
      />
      <input
        aria-label='Create a new todo'
        name='title'
        required
        maxLength={200}
        autoComplete='off'
        placeholder='Create a new todo…'
        className='h-12 w-full bg-transparent pt-1 text-xs caret-blue-500 outline-none placeholder:text-gray-600 md:h-16 md:text-lg dark:placeholder:text-purple-600'
      />
    </form>
  );
}
