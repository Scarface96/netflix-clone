import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaPlus, FaCheck, FaTimes, FaStar } from 'react-icons/fa';
import { getMovie, img, pickTrailer, year, runtime, withImages } from '../tmdb';
import { useDetails } from '../context/DetailsContext';
import { useMyList } from '../context/ListContext';

const DetailsModal = () => {
  const { openId, autoplay, open, close } = useDetails();
  const { has, toggle } = useMyList();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!openId) return undefined;
    const controller = new AbortController();
    setMovie(null);
    setError(false);
    setPlaying(autoplay);
    getMovie(openId, controller.signal)
      .then(setMovie)
      .catch((err) => err.name !== 'AbortError' && setError(true));
    dialogRef.current?.scrollTo?.(0, 0);
    return () => controller.abort();
  }, [openId, autoplay]);

  useEffect(() => {
    if (!openId) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    const previous = document.activeElement;
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, [openId, close]);

  if (!openId) return null;

  const trailer = movie && pickTrailer(movie.videos);
  const saved = movie && has(movie.id);
  const cast = movie?.credits?.cast?.slice(0, 8) || [];
  const director = movie?.credits?.crew?.find((c) => c.job === 'Director');
  const similar = withImages(movie?.similar?.results).slice(0, 6);

  return (
    <div
      className='fixed inset-0 z-50 overflow-y-auto bg-black/80 px-2 py-6 md:px-6 md:py-10'
      onMouseDown={(e) => e.target === e.currentTarget && close()}
      ref={dialogRef}
    >
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='details-title'
        className='relative mx-auto max-w-4xl overflow-hidden rounded-lg bg-neutral-900 text-white shadow-2xl'
      >
        <button
          type='button'
          ref={closeRef}
          onClick={close}
          aria-label='Close'
          className='absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 hover:bg-black'
        >
          <FaTimes aria-hidden='true' />
        </button>

        {error && <p className='p-12 text-center text-neutral-400'>Couldn’t load this film. Check your connection and try again.</p>}
        {!movie && !error && <div className='aspect-video w-full animate-pulse bg-neutral-800' />}

        {movie && (
          <>
            <div className='relative aspect-video w-full bg-black'>
              {playing && trailer ? (
                <iframe
                  className='absolute inset-0 h-full w-full'
                  src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
                  title={`${movie.title} trailer`}
                  allow='autoplay; encrypted-media; picture-in-picture; fullscreen'
                  allowFullScreen
                />
              ) : (
                <>
                  {movie.backdrop_path && (
                    <img className='h-full w-full object-cover' src={img(movie.backdrop_path, 'w1280')} alt='' />
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/10 to-transparent' />
                </>
              )}
            </div>

            <div className='p-5 md:p-8'>
              <h2 id='details-title' className='font-display text-3xl leading-none md:text-5xl'>
                {movie.title}
              </h2>
              {movie.tagline && <p className='mt-2 italic text-neutral-400'>{movie.tagline}</p>}

              <div className='mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-300'>
                {movie.vote_average > 0 && (
                  <span className='flex items-center gap-1 font-bold text-white'>
                    <FaStar className='text-brand' aria-hidden='true' /> {movie.vote_average.toFixed(1)}
                  </span>
                )}
                <span>{year(movie.release_date)}</span>
                {movie.runtime > 0 && <span>{runtime(movie.runtime)}</span>}
                {movie.genres?.length > 0 && <span>{movie.genres.map((g) => g.name).join(', ')}</span>}
              </div>

              <div className='mt-5 flex flex-wrap gap-3'>
                {trailer && !playing && (
                  <button
                    type='button'
                    onClick={() => setPlaying(true)}
                    className='flex items-center gap-2 rounded bg-white px-5 py-2 font-bold text-black hover:bg-neutral-200'
                  >
                    <FaPlay aria-hidden='true' /> Play trailer
                  </button>
                )}
                {!trailer && <span className='self-center text-sm text-neutral-400'>No trailer available yet.</span>}
                <button
                  type='button'
                  onClick={() => toggle(movie)}
                  aria-pressed={saved}
                  className={`flex items-center gap-2 rounded border px-5 py-2 font-bold ${
                    saved ? 'border-brand text-brand' : 'border-white/60 hover:border-white'
                  }`}
                >
                  {saved ? <FaCheck aria-hidden='true' /> : <FaPlus aria-hidden='true' />}
                  {saved ? 'In My List' : 'Add to My List'}
                </button>
              </div>

              <div className='mt-6 grid gap-6 md:grid-cols-[2fr_1fr]'>
                <p className='leading-relaxed text-neutral-200'>{movie.overview}</p>
                <dl className='space-y-3 text-sm'>
                  {director && (
                    <div>
                      <dt className='text-neutral-500'>Director</dt>
                      <dd>{director.name}</dd>
                    </div>
                  )}
                  {cast.length > 0 && (
                    <div>
                      <dt className='text-neutral-500'>Cast</dt>
                      <dd>{cast.map((c) => c.name).join(', ')}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {similar.length > 0 && (
                <div className='mt-8'>
                  <h3 className='mb-3 text-lg font-bold'>More like this</h3>
                  <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
                    {similar.map((s) => (
                      <button
                        key={s.id}
                        type='button'
                        onClick={() => open(s.id)}
                        className='overflow-hidden rounded bg-neutral-800 text-left hover:ring-2 hover:ring-brand focus-visible:ring-2 focus-visible:ring-brand'
                      >
                        <img src={img(s.backdrop_path || s.poster_path, 'w500')} alt='' className='aspect-video w-full object-cover' loading='lazy' />
                        <span className='block p-2 text-sm font-bold leading-tight'>{s.title}</span>
                        <span className='block px-2 pb-2 text-xs text-neutral-400'>{year(s.release_date)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsModal;
