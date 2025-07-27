import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BodyLayout from "../layouts/bodyLayout";
import type { Product, Review } from "../../../libs/Types";
import axios from "axios";
import Loader from "../elements/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShopping,
  faHeart,
  faMinus,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Reviews from "../elements/products/Reviews";
import RelatedProducts from "../elements/products/RelatedProducts";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(import.meta.env.VITE_API_URL + "/api/review/all", {
        params: {
          productId: id,
        },
        withCredentials: true,
      })
      .then((res) => {
        setTotalReviews(res.data.length);
        let reviewSum = 0;
        for (let i = 0; i < res.data.length; i++) {
          reviewSum += res.data[i].rating;
        }
        let avg = Math.round(reviewSum / res.data.length) | 0;
        setRating(avg);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(import.meta.env.VITE_API_URL + "/api/product/" + id)
      .then((res) => {
        console.log(res.data);

        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar as IconDefinition}
          className={"text-[#FFCC00]"}
        />
      );
    }
    for (let i = rating + 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar as IconDefinition}
          className={"text-[#DFDFDF]"}
        />
      );
    }
    setStars(stars);
  }, [rating]);

  return loading ? (
    <Loader />
  ) : (
    product && (
      <BodyLayout>
        <div className='bg-[url("/imgs/breadcrumb1.jpg")] bg-cover bg-center w-full py-20 text-black text-center text-xl font-bold'>
          <h1>{product.name}</h1>
        </div>
        <div className="flex justify-center w-full mt-10">
          <div className="container">
            <div className="flex gap-10">
              <div className="w-2/5">
                <div className="aspect-square w-full rounded-xl bg-[#F7F4EF] flex items-center justify-center">
                  <img
                    src={product.image}
                    className="aspect-square object-cover w-3/4 rounded-xl"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-3/5">
                <div className="pb-10 border-b border-[#E5E5E5]">
                  <h1 className="text-4xl font-bold mb-5">{product.name}</h1>
                  <div className="flex items-center gap-5 mb-10">
                    <div className="text-[#FFCC00]">{stars}</div>
                    <h2 className="text-[#808080] text-sm">
                      ({totalReviews} Customers Reviews)
                    </h2>
                  </div>
                  <p className="text-[#808080]">{product.description}</p>
                </div>
                <div className="flex items-center justify-between py-10 border-b border-[#e5e5e5]">
                  <div className="flex items-center">
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F7F4EF] text-sm font-bold cursor-pointer hover:text-[#FFCC00] outline-none"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : quantity)
                      }
                    >
                      <FontAwesomeIcon icon={faMinus as IconDefinition} />
                    </button>
                    <p className="font-bold w-10 flex items-center justify-center">
                      {quantity}
                    </p>
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F7F4EF] text-sm font-bold cursor-pointer hover:text-[#FFCC00] outline-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus as IconDefinition} />
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-5">
                    <button className="bg-[#FFCC00] px-40 h-14 rounded-lg text-sm flex items-center justify-center gap-4 font-semibold cursor-pointer hover:bg-[#1E1D23] hover:text-[#FFCC00]">
                      <FontAwesomeIcon
                        icon={faBasketShopping as IconDefinition}
                      />
                      Add to Cart
                    </button>
                    <button className="w-14 h-14 flex items-center justify-center text-[#FF0000] text-lg rounded-lg bg-[#F7F4EF] cursor-pointer hover:bg-[#FF0000] hover:text-[#F7F4EF]">
                      <FontAwesomeIcon icon={faHeart as IconDefinition} />
                    </button>
                  </div>
                </div>
                <div className="text-sm py-10 border-b border-[#e5e5e5]">
                  <h3 className="mb-3">
                    Category:{" "}
                    <span className="text-[#808080] font-bold">
                      {product.category.name}
                    </span>
                  </h3>
                  <h3>
                    Added at:{" "}
                    <span className="text-[#808080] font-bold">
                      {product.createdAt.slice(0, 10)}
                    </span>
                  </h3>
                </div>
                <div className="py-10 border-b border-[#e5e5e5]">
                  <ul className="list-disc text-[#808080] pl-10">
                    <li>Free global shipping on all orders</li>
                    <li>30 days easy returns if you change your mind</li>
                    <li>Order before noon for same day dispatch</li>
                  </ul>
                </div>
              </div>
            </div>
            <Reviews
              productId={Number(id)}
              setRating={setRating}
              setTotalReviews={setTotalReviews}
              rating={rating}
              totalReviews={totalReviews}
            />
            <RelatedProducts product={product} />
          </div>
        </div>
      </BodyLayout>
    )
  );
};

export default Product;
