import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { useMyList } from '../context/ListContext';

export const Logo = ({ className = '' }) => (
  <span className={`font-display text-xl tracking-tight text-brand sm:text-2xl md:text-3xl ${className}`}>
    REEL<span className='text-white'>HOUSE</span>
  </span>
);

const linkClass = ({ isActive }) =>
  `whitespace-nowrap text-sm md:text-base ${isActive ? 'font-bold text-white' : 'text-neutral-300 hover:text-white'}`;

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const { list } = useMyList();
  const navigate = useNavigate();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? 'bg-black/95 shadow-lg shadow-black/40' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <nav className='flex items-center gap-3 px-4 py-3 sm:gap-4 md:gap-8 md:px-12' aria-label='Main'>
        <Link to='/' aria-label='Reelhouse home'>
          <Logo />
        </Link>
        <div className='flex items-center gap-4 md:gap-6'>
          <NavLink to='/' end className={(s) => `hidden sm:inline ${linkClass(s)}`}>
            Home
          </NavLink>
          <NavLink to='/my-list' className={linkClass}>
            My List
            {list.length > 0 && (
              <span className='ml-1.5 rounded-full bg-brand px-1.5 text-xs font-bold text-black'>{list.length}</span>
            )}
          </NavLink>
        </div>
        <div className='ml-auto flex items-center gap-3 md:gap-4'>
          <NavLink to='/search' className={linkClass} aria-label='Search'>
            <FaSearch aria-hidden='true' />
          </NavLink>
          {user?.email ? (
            <>
              <NavLink to='/account' className={`hidden sm:inline ${linkClass({ isActive: false })}`}>
                Account
              </NavLink>
              <button
                type='button'
                onClick={handleLogout}
                className='whitespace-nowrap rounded bg-brand px-3 py-1.5 text-sm font-bold text-black hover:bg-brand-dark md:px-5'
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to='/login' className='hidden text-sm text-white sm:inline md:text-base'>
                Sign in
              </Link>
              <Link
                to='/signup'
                className='whitespace-nowrap rounded bg-brand px-3 py-1.5 text-sm font-bold text-black hover:bg-brand-dark md:px-5'
              >
                Join free
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
