import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BodyLayout from "../layouts/BodyLayout";
import type { Product } from "../../../libs/Types";
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
import { useAppContext } from "../../../libs/AppContext";
import CartLoader from "../elements/CartLoader";
import { useQuery } from "@tanstack/react-query";
import { getAllReviewsByProductId } from "../../api/review";
import { getProductById } from "../../api/products";

const ProductComponent = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState<React.ReactElement[]>([]);
  const { user, managedCart, cartLoading, manageFavorite } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(
    id
      ? user?.favorites.find((fav) => fav.product.id == Number(id))
        ? true
        : false
      : false,
  );

  const { data: reviews, isPending } = useQuery({
    queryKey: ["get-reviews", id],
    queryFn: () => getAllReviewsByProductId(id || ""),
  });

  const { data: product, isPending: isProductPending } = useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getProductById(id || ""),
  });

  useEffect(() => {
    if (reviews) {
      setTotalReviews(reviews.length);
      let reviewSum = 0;
      for (let i = 0; i < reviews.length; i++) {
        reviewSum += reviews[i].rating;
      }
      let avg = Math.round(reviewSum / reviews.length) | 0;
      setRating(avg);
    }
  }, [reviews]);

  useEffect(() => {
    let stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar as IconDefinition}
          className={"text-[#FFCC00]"}
        />,
      );
    }
    for (let i = rating + 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar as IconDefinition}
          className={"text-[#DFDFDF]"}
        />,
      );
    }
    setStars(stars);
  }, [rating]);

  return isPending || isProductPending ? (
    <Loader />
  ) : (
    product && (
      <BodyLayout>
        <div className='bg-[url("/imgs/breadcrumb1.jpg")] bg-cover bg-center w-full py-16 sm:py-20 px-4 text-black text-center text-xl sm:text-2xl font-bold'>
          <h1>{product.name}</h1>
        </div>
        <div className="mt-10 flex w-full justify-center">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
              <div className="w-full lg:w-2/5">
                <div className="aspect-square w-full rounded-xl bg-[#F7F4EF] flex items-center justify-center">
                  <img
                    src={product.image}
                    className="aspect-square object-cover w-3/4 rounded-xl"
                  />
                </div>
              </div>
              <div className="w-full lg:w-3/5">
                <div className="pb-10 border-b border-[#E5E5E5]">
                  <h1 className="mb-5 text-3xl sm:text-4xl font-bold">{product.name}</h1>
                  <div className="mb-8 sm:mb-10 flex items-center gap-4 sm:gap-5">
                    <div className="text-[#FFCC00]">{stars}</div>
                    <h2 className="text-[#808080] text-sm">
                      ({totalReviews} Customers Reviews)
                    </h2>
                  </div>
                  <p className="text-[#808080]">{product.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 py-8 sm:py-10 border-b border-[#e5e5e5]">
                  <div className="flex items-center">
                    <button
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#F7F4EF] text-sm font-bold cursor-pointer lg:hover:text-[#FFCC00] outline-none"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : quantity)
                      }
                    >
                      <FontAwesomeIcon icon={faMinus as IconDefinition} />
                    </button>
                    <p className="w-10 flex items-center justify-center font-bold">
                      {quantity}
                    </p>
                    <button
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-[#F7F4EF] text-sm font-bold cursor-pointer lg:hover:text-[#FFCC00] outline-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <FontAwesomeIcon icon={faPlus as IconDefinition} />
                    </button>
                  </div>
                  <div className="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5">
                    <button
                      className={`min-h-11 h-14 w-full sm:w-auto px-8 sm:px-16 lg:px-24 xl:px-40 rounded-lg text-sm flex items-center justify-center gap-4 font-semibold cursor-pointer ${
                        user?.cart.cartProducts.find(
                          (prod) => prod.product.id == product.id,
                        )
                          ? "bg-[#1E1D23] text-[#FFCC00]"
                          : "text-[#1E1D23] bg-[#FFCC00]"
                      }`}
                      onClick={() => {
                        let el = user?.cart.cartProducts.find(
                          (prod) => prod.product.id == product.id,
                        );
                        managedCart(
                          product.id,
                          el ? String(el.id) : "add",
                          true,
                          quantity,
                        );
                      }}
                    >
                      {cartLoading == product.id ? (
                        <CartLoader />
                      ) : (
                        <FontAwesomeIcon icon={faBasketShopping} />
                      )}
                      {user?.cart.cartProducts.find(
                        (prod) => prod.product.id == product.id,
                      )
                        ? "In Cart"
                        : "Add to Cart"}
                    </button>
                    <button
                      className={`min-h-11 min-w-[44px] h-14 w-14 flex items-center justify-center cursor-pointer text-lg rounded-lg ${
                        isFavorite
                          ? "bg-[#FF0000] text-[#F7F4EF] lg:hover:bg-[#F7F4EF] lg:hover:text-[#FF0000]"
                          : "bg-[#F7F4EF] text-[#FF0000] lg:hover:bg-[#FF0000] lg:hover:text-[#F7F4EF]"
                      }`}
                      onClick={() => {
                        setIsFavorite(!isFavorite);
                        manageFavorite(
                          product,
                          isFavorite ? "delete" : "create",
                        );
                      }}
                    >
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

export default ProductComponent;
