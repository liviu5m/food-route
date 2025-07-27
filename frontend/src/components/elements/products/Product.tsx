import React, { useEffect, useState } from "react";
import type { Product } from "../../../../libs/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = ({ product }: { product: Product }) => {
  const [hover, setHover] = useState(false);
  const [rating, setRating] = useState<React.ReactElement[]>();

  const formatDesc = (desc: string) => {
    let res = desc;
    if (desc.length > 100) res = desc.substring(0, 100) + "...";
    return res;
  };

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/review/all", {
        params: {
          productId: product.id,
        },
        withCredentials: true,
      })
      .then((res) => {
        let reviewSum = 0;
        for (let i = 0; i < res.data.length; i++) {
          reviewSum += res.data[i].rating;
        }
        let stars = [];
        let avg = Math.round(reviewSum / res.data.length) | 0;

        for (let i = 1; i <= avg; i++) {
          stars.push(
            <FontAwesomeIcon icon={faStar} className={"text-[#FFCC00]"} />
          );
        }
        for (let i = avg + 1; i <= 5; i++) {
          stars.push(
            <FontAwesomeIcon icon={faStar} className={"text-[#DFDFDF]"} />
          );
        }
        setRating(stars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="rounded-xl border border-[#E5E5E5] flex flex-col items-center justify-between"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div
            className={`w-full aspect-square mb-3 rounded-xl ${
              hover ? "bg-[#FFCC00]" : ""
            }`}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                className={`rounded-xl scale-80 aspect-square object-cover ${
                  hover && "scale-90"
                }`}
                alt=""
              />
            </Link>
          </div>
          <div className="p-5 pt-0">
            <div className="mb-2">{rating}</div>
            <Link
              to={`/product/${product.id}`}
              className="text-lg font-bold hover:text-[#FFCC00]"
            >
              {product.name}
            </Link>
            <p className="my-2 text-sm text-[#808080]">
              {formatDesc(product.description)}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full p-5">
          <h2 className="text-[#FFCC00] font-bold text-xl">${product.price}</h2>
          <button className="px-4 text-lg py-3 rounded-2xl bg-[#FFCC00] hover:text-[#FFCC00] hover:bg-[#1E1D23] cursor-pointer">
            <FontAwesomeIcon icon={faBasketShopping} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
