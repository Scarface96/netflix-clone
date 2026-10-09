import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import MovieCard from '../components/MovieCard';
import { searchMovies, withImages } from '../tmdb';

const Search = () => {
  const [params, setParams] = useSearchParams();
  const [text, setText] = useState(params.get('q') || '');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const q = text.trim();

  useEffect(() => {
    setParams(q ? { q } : {}, { replace: true });
    if (q.length < 2) {
      setResults([]);
      setStatus('idle');
      return undefined;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setStatus('loading');
      searchMovies(q, 1, controller.signal)
        .then((data) => {
          setResults(withImages(data.results));
          setStatus('done');
        })
        .catch((err) => err.name !== 'AbortError' && setStatus('error'));
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [q, setParams]);

  return (
    <main className='min-h-screen px-4 pb-10 pt-24 text-white md:px-12'>
      <label className='flex items-center gap-3 border-b-2 border-neutral-700 pb-2 focus-within:border-brand'>
        <FaSearch className='text-neutral-500' aria-hidden='true' />
        <span className='sr-only'>Search films</span>
        <input
          type='search'
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Search films by title'
          className='w-full bg-transparent py-2 text-2xl font-bold outline-none placeholder:text-neutral-600 md:text-4xl'
        />
      </label>

      <div className='mt-6' aria-live='polite'>
        {status === 'idle' && <p className='text-neutral-400'>Type at least two letters to search thousands of films.</p>}
        {status === 'loading' && results.length === 0 && <p className='text-neutral-400'>Searching…</p>}
        {status === 'error' && <p className='text-red-300'>Search isn’t responding. Check your connection and try again.</p>}
        {status === 'done' && results.length === 0 && (
          <p className='text-neutral-400'>No films match “{q}”. Try a shorter title or check the spelling.</p>
        )}
        {results.length > 0 && (
          <div className='grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            {results.map((m) => (
              <div key={m.id}>
                <MovieCard movie={m} wide={false} />
                <p className='mt-2 text-sm font-bold leading-tight'>{m.title}</p>
                <p className='text-xs text-neutral-500'>{m.release_date?.slice(0, 4)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Search;
