// The Movie Database (https://developer.themoviedb.org/). Set REACT_APP_TMDB_KEY to use your own key.
const KEY = process.env.REACT_APP_TMDB_KEY || '994f4f6188d3b5bd6d9d2b1a6371879f';
const BASE = 'https://api.themoviedb.org/3';

export async function tmdb(path, params = {}, signal) {
  const query = new URLSearchParams({ api_key: KEY, language: 'en-US', ...params });
  const res = await fetch(`${BASE}${path}?${query}`, { signal });
  if (!res.ok) throw new Error(`TMDB request failed (${res.status})`);
  return res.json();
}

export const img = (path, size = 'w500') => (path ? `https://image.tmdb.org/t/p/${size}${path}` : null);

const discover = (genre) => ({ path: '/discover/movie', params: { with_genres: String(genre), sort_by: 'popularity.desc' } });

export const ROWS = [
  { id: 'trending', title: 'Trending this week', path: '/trending/movie/week' },
  { id: 'popular', title: 'Popular right now', path: '/movie/popular' },
  { id: 'top', title: 'All-time top rated', path: '/movie/top_rated' },
  { id: 'upcoming', title: 'Coming soon', path: '/movie/upcoming' },
  { id: 'action', title: 'Action', ...discover(28) },
  { id: 'scifi', title: 'Science fiction', ...discover(878) },
  { id: 'comedy', title: 'Comedy', ...discover(35) },
  { id: 'animation', title: 'Animation', ...discover(16) },
  { id: 'horror', title: 'Horror', ...discover(27) },
];

export const getMovie = (id, signal) =>
  tmdb(`/movie/${id}`, { append_to_response: 'videos,credits,similar' }, signal);

export const searchMovies = (q, page = 1, signal) =>
  tmdb('/search/movie', { query: q, include_adult: 'false', page: String(page) }, signal);

/** Prefer an official YouTube trailer, then any trailer, then a teaser. */
export function pickTrailer(videos) {
  const yt = (videos?.results || []).filter((v) => v.site === 'YouTube');
  return (
    yt.find((v) => v.type === 'Trailer' && v.official) ||
    yt.find((v) => v.type === 'Trailer') ||
    yt.find((v) => v.type === 'Teaser') ||
    null
  );
}

/** Only keep titles we can show a picture for. */
export const withImages = (list) => (list || []).filter((m) => m.backdrop_path || m.poster_path);

/** The small shape stored in My List (kept compatible with earlier saved data). */
export const toListItem = (m) => ({ id: m.id, title: m.title || m.name, img: m.backdrop_path || m.img || null });

export const year = (date) => (date ? date.slice(0, 4) : '');

export function runtime(mins) {
  if (!mins) return '';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}
