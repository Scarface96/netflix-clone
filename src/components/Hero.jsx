import React, { useEffect, useState } from 'react';
import { FaPlay, FaPlus, FaCheck, FaInfoCircle } from 'react-icons/fa';
import { tmdb, img, year } from '../tmdb';
import { useDetails } from '../context/DetailsContext';
import { useMyList } from '../context/ListContext';

const truncate = (str, n) => (str?.length > n ? `${str.slice(0, n).trimEnd()}…` : str);

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const { open } = useDetails();
  const { has, toggle } = useMyList();

  useEffect(() => {
    const controller = new AbortController();
    tmdb('/trending/movie/day', {}, controller.signal)
      .then((data) => {
        const picks = (data.results || []).filter((m) => m.backdrop_path && m.overview).slice(0, 10);
        setMovie(picks[Math.floor(Math.random() * picks.length)] || null);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  if (!movie) return <div className='h-[70vh] min-h-[420px] w-full animate-pulse bg-neutral-900' />;

  const saved = has(movie.id);

  return (
    <section className='relative h-[75vh] min-h-[460px] w-full text-white' aria-label='Featured film'>
      <img
        className='absolute inset-0 h-full w-full object-cover'
        src={img(movie.backdrop_path, 'original')}
        alt=''
      />
      <div className='absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent' />
      <div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent' />
      <div className='absolute bottom-[14%] left-0 w-full px-4 md:px-12'>
        <p className='mb-2 text-sm font-bold text-brand'>Trending today</p>
        <h1 className='max-w-3xl font-display text-4xl leading-none md:text-6xl'>{movie.title}</h1>
        <p className='mt-3 text-sm text-neutral-300'>
          {year(movie.release_date)}
          {movie.vote_average > 0 && <span className='ml-3'>Rated {movie.vote_average.toFixed(1)} / 10</span>}
        </p>
        <p className='mt-3 max-w-xl text-neutral-200 md:text-lg'>{truncate(movie.overview, 180)}</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <button
            type='button'
            onClick={() => open(movie.id, { play: true })}
            className='flex items-center gap-2 rounded bg-white px-6 py-2.5 font-bold text-black hover:bg-neutral-200'
          >
            <FaPlay aria-hidden='true' /> Play trailer
          </button>
          <button
            type='button'
            onClick={() => open(movie.id)}
            className='flex items-center gap-2 rounded bg-neutral-500/60 px-6 py-2.5 font-bold hover:bg-neutral-500/80'
          >
            <FaInfoCircle aria-hidden='true' /> More info
          </button>
          <button
            type='button'
            onClick={() => toggle(movie)}
            aria-pressed={saved}
            className='flex items-center gap-2 rounded border border-white/60 px-5 py-2.5 font-bold hover:border-white'
          >
            {saved ? <FaCheck aria-hidden='true' /> : <FaPlus aria-hidden='true' />} My List
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
