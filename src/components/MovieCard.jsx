import React from 'react';
import { FaPlus, FaCheck, FaStar } from 'react-icons/fa';
import { img } from '../tmdb';
import { useMyList } from '../context/ListContext';
import { useDetails } from '../context/DetailsContext';

const MovieCard = ({ movie, wide = true }) => {
  const { has, toggle } = useMyList();
  const { open } = useDetails();
  const saved = has(movie.id);
  const title = movie.title || movie.name;
  const src = img(movie.backdrop_path || movie.img || movie.poster_path, 'w500');

  return (
    <div
      className={`group relative shrink-0 ${
        wide ? 'w-[180px] sm:w-[220px] md:w-[260px] lg:w-[290px]' : 'w-full'
      } snap-start`}
    >
      <button
        type='button'
        onClick={() => open(movie.id)}
        className='block w-full overflow-hidden rounded-md bg-neutral-900 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand'
        aria-label={`More about ${title}`}
      >
        {src ? (
          <img
            src={src}
            alt=''
            loading='lazy'
            className='aspect-video w-full object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none'
          />
        ) : (
          <span className='flex aspect-video items-center justify-center p-3 text-center text-sm text-neutral-400'>
            {title}
          </span>
        )}
        <span className='pointer-events-none absolute inset-0 flex flex-col justify-end rounded-md bg-gradient-to-t from-black/90 via-black/20 to-transparent p-3 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100'>
          <span className='whitespace-normal text-sm font-bold leading-tight text-white md:text-base'>{title}</span>
          {movie.vote_average > 0 && (
            <span className='mt-1 flex items-center gap-1 text-xs text-neutral-300'>
              <FaStar className='text-brand' aria-hidden='true' /> {movie.vote_average.toFixed(1)}
            </span>
          )}
        </span>
      </button>
      <button
        type='button'
        onClick={() => toggle(movie)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${title} from My List` : `Add ${title} to My List`}
        title={saved ? 'In My List' : 'Add to My List'}
        className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border text-xs transition ${
          saved
            ? 'border-brand bg-brand text-black'
            : 'border-white/70 bg-black/60 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100'
        }`}
      >
        {saved ? <FaCheck aria-hidden='true' /> : <FaPlus aria-hidden='true' />}
      </button>
    </div>
  );
};

export default MovieCard;
