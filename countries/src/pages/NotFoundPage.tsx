import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <div className='py-20 text-center'>
      <h1 className='mb-6 text-2xl font-extrabold'>Country not found</h1>
      <Link to='/' className='inline-block surface px-8 py-2 font-light'>
        Back to all countries
      </Link>
    </div>
  );
}
