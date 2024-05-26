import { useEffect, useState } from "react";

function useMediaQuery(query) {
  const [isQuery, setQuery] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => {
      setQuery(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    setQuery(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return isQuery;
}

export default useMediaQuery;
