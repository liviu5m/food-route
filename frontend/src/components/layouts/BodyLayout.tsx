import React from "react";
import type { ReactNode } from "react";
import Header from "../elements/Header";
import Footer from "../elements/Footer";
import { ToastContainer } from "react-toastify";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-stretch overflow-x-hidden bg-white text-[#1E1D23]">
      <Header />
      <div className="h-20 sm:h-24" />
      {children}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default BodyLayout;
