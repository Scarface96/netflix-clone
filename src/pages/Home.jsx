import React from 'react';
import Hero from '../components/Hero';
import Row from '../components/Row';
import { ROWS } from '../tmdb';

const Home = () => (
  <>
    <Hero />
    <div className='relative z-10 -mt-16 space-y-1'>
      {ROWS.map((row) => (
        <Row key={row.id} title={row.title} path={row.path} params={row.params} />
      ))}
    </div>
  </>
);

export default Home;
