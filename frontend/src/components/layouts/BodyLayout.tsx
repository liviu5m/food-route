import React from "react";
import type { ReactNode } from "react";
import Header from "../elements/Header";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center flex-col text-[#1E1D23]">
      <Header />
      {children}
    </div>
  );
};

export default BodyLayout;
