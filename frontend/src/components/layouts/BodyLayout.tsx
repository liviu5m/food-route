import React from "react";
import type { ReactNode } from "react";
import Header from "../elements/Header";

type LayoutProps = {
  children: ReactNode;
};

const BodyLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div className="container">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default BodyLayout;
