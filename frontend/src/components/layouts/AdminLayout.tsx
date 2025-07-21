import React from "react";
import type { ReactNode } from "react";
import Header from "../elements/Header";
import Sidebar from "../elements/admin/Sidebar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

type LayoutProps = {
  children: ReactNode;
};

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center py-10 bg-[#222831] min-h-screen">
      <Link to="/" className="fixed top-5 left-5">
        <h1 className="flex gap-3 items-center justify-center p-2">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
        </h1>
      </Link>
      <div className="container flex gap-10">
        <div className="fixed">
          <Sidebar />
        </div>
        <div className="w-1/5"></div>
        <div className="w-4/5">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
