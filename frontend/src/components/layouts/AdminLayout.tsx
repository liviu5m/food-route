import React from "react";
import type { ReactNode } from "react";
import Sidebar from "../elements/admin/Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type LayoutProps = {
  children: ReactNode;
};

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center py-6 sm:py-10 bg-[#222831] min-h-screen px-4 sm:px-6">
      <Link to="/" className="fixed top-4 left-4 sm:top-5 sm:left-5">
        <h1 className="flex items-center justify-center gap-2 sm:gap-3 p-2">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
        </h1>
      </Link>
      <div className="mx-auto w-full max-w-screen-xl flex gap-6 lg:gap-10">
        <div className="fixed hidden lg:block">
          <Sidebar />
        </div>
        <div className="hidden lg:block w-1/5"></div>
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
