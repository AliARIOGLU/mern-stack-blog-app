import { useEffect } from "react";

//? Her sayfa geçişlerinde sayfanın başına scroll eden custom component.

export const ScrollToTop = () => {
  const { pathname } = window.location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
