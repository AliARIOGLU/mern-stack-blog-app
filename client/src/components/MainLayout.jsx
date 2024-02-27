import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { FooterSection } from "./Footer";
import { useEffect } from "react";

export const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Outlet />
      <FooterSection />
    </>
  );
};

export default MainLayout;
