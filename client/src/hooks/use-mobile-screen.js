import { useState, useEffect } from "react";

const MOBILE_SCREEN_WIDTH = 767;

export const useMobileScreen = () => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= MOBILE_SCREEN_WIDTH);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobileScreen;
};
