import React from "react";
import type { ReactNode } from "react";
import Header from "../elements/Header";
import Footer from "../elements/Footer";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center flex-col text-[#1E1D23] bg-white">
      <Header />
      <div className="h-24"></div>
      {children}
      <Footer />
    </div>
  );
};

export default BodyLayout;
