'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { fetchLinks, shorten, type Link } from '@/lib/links';

export default function Shortener() {
  const [links, setLinks] = useState<Link[]>([]);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // ponytail: a failed list load just shows no history; add an error state if it matters
    fetchLinks()
      .then(setLinks)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return setError('Please add a link');

    setError('');
    setLoading(true);
    try {
      const link = await shorten(url);
      setLinks((prev) => [link, ...prev]);
      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copy = async (link: Link) => {
    await navigator.clipboard.writeText(link.shortUrl);
    setCopiedId(link.id);
  };

  return (
    <section className='wrapper -mt-20 lg:-mt-21' aria-label='Shorten a link'>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 rounded-xl bg-violet bg-[url(/images/bg-shorten-mobile.svg)] bg-top-right bg-no-repeat p-6 lg:flex-row lg:gap-6 lg:bg-[url(/images/bg-shorten-desktop.svg)] lg:bg-cover lg:px-16 lg:py-[3.25rem]'
      >
        <div className='relative flex-1'>
          <label htmlFor='url' className='sr-only'>
            Link to shorten
          </label>
          <input
            id='url'
            type='url'
            inputMode='url'
            autoComplete='url'
            placeholder='Shorten a link here...'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            aria-invalid={!!error}
            aria-describedby='url-error'
            className={`w-full rounded-md border-3 bg-white px-4 py-2.5 text-base text-gray-950 outline-none placeholder:text-gray-500/75 focus-visible:border-cyan lg:rounded-xl lg:px-8 lg:py-4 lg:text-xl ${
              error ? 'border-red placeholder:text-red/50' : 'border-transparent'
            }`}
          />
          <p
            id='url-error'
            role='alert'
            className='mt-1 text-xs text-red italic lg:absolute lg:-bottom-8 lg:mt-0 lg:text-base'
          >
            {error}
          </p>
        </div>
        <button
          type='submit'
          disabled={loading}
          className='btn rounded-md py-2.5 text-lg lg:rounded-xl lg:px-10 lg:py-4 lg:text-xl'
        >
          {loading ? 'Shortening...' : 'Shorten It!'}
        </button>
      </form>

      {links.length > 0 && (
        <ul className='mt-6 flex flex-col gap-6 lg:gap-4'>
          {links.map((link) => {
            const copied = copiedId === link.id;
            return (
              <li
                key={link.id}
                className='flex flex-col rounded-md bg-white text-base lg:flex-row lg:items-center lg:gap-6 lg:py-4 lg:pr-6 lg:pl-8 lg:text-xl'
              >
                <p className='truncate border-b border-gray-400/50 p-4 text-gray-950 lg:flex-1 lg:border-0 lg:p-0'>
                  {link.originalUrl}
                </p>
                <div className='flex flex-col gap-3 p-4 pt-2 lg:flex-row lg:items-center lg:gap-6 lg:p-0'>
                  <a
                    href={link.shortUrl}
                    target='_blank'
                    rel='noreferrer'
                    className='text-cyan hover:underline'
                  >
                    {link.shortUrl}
                  </a>
                  <button
                    type='button'
                    onClick={() => copy(link)}
                    className={`btn rounded-md py-2.5 text-base lg:w-[6.5rem] lg:py-2.5 ${copied ? 'bg-violet hover:bg-violet' : ''}`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
