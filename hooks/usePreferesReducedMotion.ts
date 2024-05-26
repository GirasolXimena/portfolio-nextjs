import useMediaQuery from "./useMediaQuery";

function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export default usePrefersReducedMotion;
