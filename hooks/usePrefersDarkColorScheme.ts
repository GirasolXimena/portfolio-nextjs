import useMediaQuery from "./useMediaQuery";

function usePrefersDarkColorScheme() {
  return useMediaQuery("(prefers-color-scheme: dark)");
}

export default usePrefersDarkColorScheme;