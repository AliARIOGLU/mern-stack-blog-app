import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { FooterSection } from "./Footer";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <FooterSection />
    </>
  );
};

export default MainLayout;
