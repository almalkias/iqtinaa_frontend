import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop({ scrollPaths }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollPaths.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname, scrollPaths]);

  return null;
}

export default ScrollToTop;
