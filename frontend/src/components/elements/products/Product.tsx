import React, { useState } from "react";
import type { Product } from "../../../../libs/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = ({
  product,
  displayType,
}: {
  product: Product;
  displayType: string;
}) => {
  const [hover, setHover] = useState(false);

  const formatDesc = (desc: string) => {
    let res = desc;
    if (desc.length > 100) res = desc.substring(0, 100) + "...";
    return res;
  };

  return (
    <div
      className="p-5 rounded-xl border border-[#E5E5E5] flex flex-col items-center justify-between"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div>
        <div className="mb-5">
          <img
            src={product.image}
            className={`rounded-xl scale-100 ${hover && "scale-110"}`}
            alt=""
          />
        </div>
        <Link to="/" className="text-lg font-bold hover:text-[#FFCC00]">
          {product.name}
        </Link>
        <p className="my-2 text-sm text-[#808080]">
          {displayType == "grid"
            ? formatDesc(product.description)
            : product.description}
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-[#FFCC00] font-bold text-xl">${product.price}</h2>
        <button className="px-4 text-lg py-3 rounded-2xl bg-[#FFCC00] hover:text-[#FFCC00] hover:bg-[#1E1D23] cursor-pointer">
          <FontAwesomeIcon icon={faBasketShopping} />
        </button>
      </div>
    </div>
  );
};

export default Product;
