import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from './AuthContext';
import { toListItem } from '../tmdb';

const LOCAL_KEY = 'reelhouse-my-list';
const ListContext = createContext(null);

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
  } catch {
    return [];
  }
}

function writeLocal(list) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable – list lives in memory for this visit */
  }
}

/**
 * My List works for everyone: guests keep it in this browser, signed-in users keep it in
 * Firestore (users/{email}.savedShows). Anything saved as a guest is merged in on sign-in.
 * If the database can't be reached, the list quietly falls back to this browser.
 */
export function ListContextProvider({ children }) {
  const { user } = UserAuth();
  const [list, setList] = useState(readLocal);
  const [cloud, setCloud] = useState(false);
  const merged = useRef(false);

  useEffect(() => {
    if (!user?.email) {
      setCloud(false);
      setList(readLocal());
      return undefined;
    }
    merged.current = false;
    const ref = doc(db, 'users', user.email);
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        const remote = snap.data()?.savedShows || [];
        const local = readLocal();
        const extra = local.filter((l) => !remote.some((r) => r.id === l.id));
        if (!merged.current && extra.length) {
          merged.current = true;
          setDoc(ref, { savedShows: [...extra, ...remote] }, { merge: true })
            .then(() => writeLocal([]))
            .catch(() => {});
        }
        setCloud(true);
        setList(remote);
      },
      () => {
        setCloud(false);
        setList(readLocal());
      }
    );
    return unsubscribe;
  }, [user?.email]);

  const save = useCallback(
    async (next) => {
      setList(next);
      if (cloud && user?.email) {
        try {
          await setDoc(doc(db, 'users', user.email), { savedShows: next }, { merge: true });
          return;
        } catch {
          setCloud(false);
        }
      }
      writeLocal(next);
    },
    [cloud, user?.email]
  );

  const has = useCallback((id) => list.some((m) => m.id === id), [list]);

  const toggle = useCallback(
    (movie) => save(has(movie.id) ? list.filter((m) => m.id !== movie.id) : [toListItem(movie), ...list]),
    [has, list, save]
  );

  const remove = useCallback((id) => save(list.filter((m) => m.id !== id)), [list, save]);

  return <ListContext.Provider value={{ list, has, toggle, remove, cloud }}>{children}</ListContext.Provider>;
}

export const useMyList = () => useContext(ListContext);
