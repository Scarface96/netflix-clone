import { createContext, useCallback, useContext, useState } from 'react';

const DetailsContext = createContext(null);

/** Lets any card open the movie details dialog. */
export function DetailsProvider({ children }) {
  const [openId, setOpenId] = useState(null);
  const [autoplay, setAutoplay] = useState(false);

  const open = useCallback((id, { play = false } = {}) => {
    setOpenId(id);
    setAutoplay(play);
  }, []);
  const close = useCallback(() => setOpenId(null), []);

  return <DetailsContext.Provider value={{ openId, autoplay, open, close }}>{children}</DetailsContext.Provider>;
}

export const useDetails = () => useContext(DetailsContext);
