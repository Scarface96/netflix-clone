import React, { useEffect, useRef, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import MovieCard from './MovieCard';
import { tmdb, withImages } from '../tmdb';

const Row = ({ title, path, params }) => {
  const [movies, setMovies] = useState([]);
  const [failed, setFailed] = useState(false);
  const slider = useRef(null);
  const paramsKey = JSON.stringify(params || {});

  useEffect(() => {
    const controller = new AbortController();
    tmdb(path, JSON.parse(paramsKey), controller.signal)
      .then((data) => setMovies(withImages(data.results)))
      .catch((err) => err.name !== 'AbortError' && setFailed(true));
    return () => controller.abort();
  }, [path, paramsKey]);

  const slide = (dir) => {
    const el = slider.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  if (failed) return null;

  return (
    <section className='relative py-3' aria-label={title}>
      <h2 className='px-4 pb-2 text-lg font-bold text-white md:px-12 md:text-xl'>{title}</h2>
      <div className='group relative'>
        <button
          type='button'
          onClick={() => slide(-1)}
          aria-label={`Scroll ${title} left`}
          className='absolute bottom-0 left-0 top-0 z-10 hidden w-12 items-center justify-center bg-black/50 text-white opacity-0 transition hover:bg-black/70 focus-visible:opacity-100 group-hover:opacity-100 md:flex'
        >
          <MdChevronLeft size={40} aria-hidden='true' />
        </button>
        <div
          ref={slider}
          className='flex snap-x scroll-px-4 gap-2 overflow-x-auto scroll-smooth px-4 scrollbar-hide md:scroll-px-12 md:px-12'
        >
          {movies.length === 0
            ? Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className='aspect-video w-[180px] shrink-0 animate-pulse rounded-md bg-neutral-800 sm:w-[220px] md:w-[260px] lg:w-[290px]'
                />
              ))
            : movies.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
        <button
          type='button'
          onClick={() => slide(1)}
          aria-label={`Scroll ${title} right`}
          className='absolute bottom-0 right-0 top-0 z-10 hidden w-12 items-center justify-center bg-black/50 text-white opacity-0 transition hover:bg-black/70 focus-visible:opacity-100 group-hover:opacity-100 md:flex'
        >
          <MdChevronRight size={40} aria-hidden='true' />
        </button>
      </div>
    </section>
  );
};

export default Row;
