import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="flex flex-col gap-10">
      <Link to={"/admin/category"} className="px-20 py-3 rounded-lg bg-[#00ADB5] text-[#eee] text-center font-semibold hover:bg-[#eee] hover:text-[#00ADB5]">Category</Link>
      <Link to={"/admin/product"} className="px-20 py-3 rounded-lg bg-[#00ADB5] text-[#eee] text-center font-semibold hover:bg-[#eee] hover:text-[#00ADB5]">Product</Link>
    </ul>
  );
};

export default Sidebar;
