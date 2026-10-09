import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { useMyList } from '../context/ListContext';

const Account = () => {
  const { user, logOut } = UserAuth();
  const { list, cloud } = useMyList();
  const navigate = useNavigate();
  const since = user?.metadata?.creationTime && new Date(user.metadata.creationTime);

  return (
    <main className='min-h-screen px-4 pb-10 pt-28 text-white md:px-12'>
      <h1 className='font-display text-4xl md:text-5xl'>Account</h1>
      <dl className='mt-8 max-w-xl divide-y divide-neutral-800 border-y border-neutral-800'>
        <div className='flex justify-between gap-4 py-4'>
          <dt className='text-neutral-400'>Email</dt>
          <dd className='truncate font-bold'>{user?.email}</dd>
        </div>
        {since && (
          <div className='flex justify-between gap-4 py-4'>
            <dt className='text-neutral-400'>Member since</dt>
            <dd>{since.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</dd>
          </div>
        )}
        <div className='flex justify-between gap-4 py-4'>
          <dt className='text-neutral-400'>My List</dt>
          <dd>
            <Link to='/my-list' className='underline hover:text-brand'>
              {list.length} {list.length === 1 ? 'film' : 'films'}
            </Link>
            <span className='ml-2 text-sm text-neutral-500'>{cloud ? 'synced' : 'this browser only'}</span>
          </dd>
        </div>
      </dl>
      <button
        type='button'
        onClick={async () => {
          await logOut();
          navigate('/');
        }}
        className='mt-8 rounded border border-white/60 px-5 py-2 font-bold hover:border-white'
      >
        Sign out
      </button>
    </main>
  );
};

export default Account;
