export default function FormActions({
  editing,
  pending,
  onClose,
}: {
  editing: boolean;
  pending: boolean;
  onClose: () => void;
}) {
  return (
    <div className='flex items-center gap-2 bg-white px-6 py-5 shadow-[0_-40px_40px_-20px_rgb(0_0_0/0.1)] md:rounded-br-[1.25rem] md:px-14 md:py-8 md:shadow-none dark:bg-navy-950'>
      {editing ? (
        <>
          <button type='button' onClick={onClose} className='ml-auto btn-light'>
            Cancel
          </button>
          <button type='submit' disabled={pending} className='btn-primary'>
            Save Changes
          </button>
        </>
      ) : (
        <>
          <button type='button' onClick={onClose} className='mr-auto btn-light px-4 md:px-6'>
            Discard
          </button>
          <button
            type='submit'
            name='intent'
            value='draft'
            disabled={pending}
            className='btn-dark px-4 md:px-6'
          >
            Save as Draft
          </button>
          <button
            type='submit'
            name='intent'
            value='send'
            disabled={pending}
            className='btn-primary px-4 md:px-6'
          >
            Save & Send
          </button>
        </>
      )}
    </div>
  );
}
