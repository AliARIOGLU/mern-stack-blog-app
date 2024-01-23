import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//? Her sayfa geçişlerinde sayfanın başına scroll eden custom component.

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
