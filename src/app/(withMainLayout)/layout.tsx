import { ReactNode } from "react";
import Header from "../components/shared/Header/Header";
import Footer from "../components/shared/Footer/Footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
