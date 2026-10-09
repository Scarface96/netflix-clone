import React from 'react';
import { Logo } from './Navbar';

const Footer = () => (
  <footer className='mt-12 border-t border-neutral-800 px-4 py-8 text-sm text-neutral-500 md:px-12'>
    <Logo className='!text-xl' />
    <p className='mt-3 max-w-2xl'>
      Reelhouse is a portfolio project by Tony Mulunda. It shows real film data and trailers but doesn’t stream full
      films. Film data and images from{' '}
      <a className='underline hover:text-white' href='https://www.themoviedb.org/'>
        TMDB
      </a>
      ; this product uses the TMDB API but is not endorsed or certified by TMDB.
    </p>
  </footer>
);

export default Footer;
