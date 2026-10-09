import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useMyList } from '../context/ListContext';
import { UserAuth } from '../context/AuthContext';

const MyList = () => {
  const { list, cloud } = useMyList();
  const { user } = UserAuth();

  return (
    <main className='min-h-screen px-4 pb-10 pt-24 text-white md:px-12'>
      <h1 className='font-display text-4xl md:text-5xl'>My List</h1>
      <p className='mt-2 text-neutral-400'>
        {user?.email && cloud
          ? 'Saved to your account, so it follows you to any device.'
          : user?.email
          ? 'Saved in this browser for now; your account list is unavailable at the moment.'
          : 'Saved in this browser. Sign in to keep it on every device.'}
      </p>

      {list.length === 0 ? (
        <div className='mt-16 max-w-md'>
          <p className='text-xl font-bold'>Nothing saved yet</p>
          <p className='mt-2 text-neutral-400'>Use the + on any film to save it here for later.</p>
          <Link to='/' className='mt-6 inline-block rounded bg-brand px-5 py-2 font-bold text-black hover:bg-brand-dark'>
            Browse films
          </Link>
        </div>
      ) : (
        <div className='mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {list.map((m) => (
            <div key={m.id}>
              <MovieCard movie={m} wide={false} />
              <p className='mt-2 text-sm font-bold leading-tight'>{m.title}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MyList;
