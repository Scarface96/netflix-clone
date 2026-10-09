import { pickTrailer, runtime, withImages, toListItem, year } from './tmdb';

test('pickTrailer prefers an official YouTube trailer', () => {
  const videos = {
    results: [
      { key: 'a', site: 'Vimeo', type: 'Trailer', official: true },
      { key: 'b', site: 'YouTube', type: 'Teaser', official: true },
      { key: 'c', site: 'YouTube', type: 'Trailer', official: false },
      { key: 'd', site: 'YouTube', type: 'Trailer', official: true },
    ],
  };
  expect(pickTrailer(videos).key).toBe('d');
  expect(pickTrailer({ results: [{ key: 'b', site: 'YouTube', type: 'Teaser' }] }).key).toBe('b');
  expect(pickTrailer(undefined)).toBeNull();
});

test('formatting helpers', () => {
  expect(runtime(169)).toBe('2h 49m');
  expect(runtime(45)).toBe('45m');
  expect(runtime(0)).toBe('');
  expect(year('2014-11-05')).toBe('2014');
});

test('list items keep the shape used by earlier saved data', () => {
  expect(toListItem({ id: 1, title: 'Up', backdrop_path: '/x.jpg', overview: '…' })).toEqual({
    id: 1,
    title: 'Up',
    img: '/x.jpg',
  });
  expect(withImages([{ id: 1 }, { id: 2, poster_path: '/p.jpg' }])).toHaveLength(1);
});
