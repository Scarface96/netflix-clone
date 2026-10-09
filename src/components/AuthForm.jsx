import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserAuth, authMessage } from '../context/AuthContext';
import { tmdb, img } from '../tmdb';

/** A slowly tilted wall of real posters behind the sign-in card. */
const PosterWall = () => {
  const [posters, setPosters] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    Promise.all([1, 2].map((page) => tmdb('/movie/top_rated', { page: String(page) }, controller.signal)))
      .then((pages) => setPosters(pages.flatMap((p) => p.results).filter((m) => m.poster_path).slice(0, 36)))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <div className='pointer-events-none absolute inset-0 overflow-hidden' aria-hidden='true'>
      <div className='absolute -inset-[20%] grid rotate-[-8deg] grid-cols-4 gap-3 opacity-40 sm:grid-cols-6'>
        {posters.map((p) => (
          <img key={p.id} src={img(p.poster_path, 'w342')} alt='' className='aspect-[2/3] w-full rounded object-cover' />
        ))}
      </div>
      <div className='absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black' />
    </div>
  );
};

const AuthForm = ({ mode }) => {
  const isSignup = mode === 'signup';
  const { signUp, logIn, resetPassword } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setBusy(true);
    try {
      if (isSignup) await signUp(email.trim(), password);
      else await logIn(email.trim(), password);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(authMessage(err));
      setBusy(false);
    }
  };

  const handleReset = async () => {
    setError('');
    setInfo('');
    if (!email.trim()) {
      setError('Enter your email above, then choose “Forgot password?” again.');
      return;
    }
    try {
      await resetPassword(email.trim());
      setInfo(`We sent a reset link to ${email.trim()}.`);
    } catch (err) {
      setError(authMessage(err));
    }
  };

  return (
    <main className='relative flex min-h-screen items-center justify-center px-4 py-24 text-white'>
      <PosterWall />
      <div className='relative w-full max-w-[420px] rounded-lg bg-black/80 p-8 shadow-2xl ring-1 ring-white/10 md:p-12'>
        <h1 className='font-display text-3xl'>{isSignup ? 'Create your free account' : 'Welcome back'}</h1>
        <p className='mt-2 text-sm text-neutral-400'>
          {isSignup ? 'Save films to My List and pick them up on any device.' : 'Sign in to see your saved films.'}
        </p>

        {error && (
          <p className='mt-5 rounded bg-red-500/20 p-3 text-sm text-red-200' role='alert'>
            {error}
          </p>
        )}
        {info && (
          <p className='mt-5 rounded bg-brand/20 p-3 text-sm text-brand' role='status'>
            {info}
          </p>
        )}

        <form onSubmit={handleSubmit} className='mt-5 flex flex-col gap-3' noValidate>
          <label className='flex flex-col gap-1 text-sm text-neutral-300'>
            Email
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='email'
              className='rounded bg-neutral-800 p-3 text-base text-white outline-none ring-brand focus:ring-2'
            />
          </label>
          <label className='flex flex-col gap-1 text-sm text-neutral-300'>
            Password
            <span className='flex rounded bg-neutral-800 ring-brand focus-within:ring-2'>
              <input
                type={show ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                className='w-full bg-transparent p-3 text-base text-white outline-none'
              />
              <button type='button' onClick={() => setShow((s) => !s)} className='px-3 text-sm text-neutral-400 hover:text-white'>
                {show ? 'Hide' : 'Show'}
              </button>
            </span>
            {isSignup && <span className='text-xs text-neutral-500'>At least 6 characters.</span>}
          </label>

          <button
            disabled={busy}
            className='mt-4 rounded bg-brand py-3 font-bold text-black hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70'
          >
            {busy ? 'One moment…' : isSignup ? 'Create account' : 'Sign in'}
          </button>
        </form>

        {!isSignup && (
          <button type='button' onClick={handleReset} className='mt-3 text-sm text-neutral-400 underline hover:text-white'>
            Forgot password?
          </button>
        )}

        <p className='mt-8 text-sm text-neutral-400'>
          {isSignup ? 'Already have an account? ' : 'New to Reelhouse? '}
          <Link to={isSignup ? '/login' : '/signup'} className='font-bold text-white hover:underline'>
            {isSignup ? 'Sign in' : 'Create a free account'}
          </Link>
        </p>
      </div>
    </main>
  );
};

export default AuthForm;
