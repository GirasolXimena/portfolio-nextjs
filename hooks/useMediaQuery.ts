import { useEffect, useState } from "react";

const isRenderingOnServer = typeof window === 'undefined';

const getInitialState = () => isRenderingOnServer || !window.matchMedia

function useMediaQuery(query) {
  const [isQuery, setQuery] = useState(getInitialState);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => {
      setQuery(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    setQuery(mediaQuery.matches);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return isQuery;
}

export default useMediaQuery;