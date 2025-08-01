import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../../libs/AppContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import type { Review } from "../../../../libs/Types";
import SingleReview from "./SingleReview";
import SmallLoader from "../SmallLoader";
import Loader from "../Loader";
import type { Dispatch, SetStateAction } from "react";
import { toast, ToastContainer } from "react-toastify";

type ReviewsProps = {
  productId: number;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  totalReviews: number;
  setTotalReviews: Dispatch<SetStateAction<number>>;
};

const Reviews = ({
  productId,
  rating,
  setRating,
  totalReviews,
  setTotalReviews,
}: ReviewsProps) => {
  const { user } = useAppContext();
  const [review, setReview] = useState({
    rating: 0,
    review: "",
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const navigate = useNavigate();

  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        className={`${
          review.rating >= i ? "text-[#FFCC00]" : "text-[#DFDFDF]"
        } cursor-pointer`}
        onClick={() =>
          setReview({ ...review, rating: i == review.rating ? 0 : i })
        }
      />
    );
  }

  const manageReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!localStorage.getItem("jwtToken")) navigate("/auth/login");
    if (editReview) {
      axios
        .put(
          import.meta.env.VITE_API_URL + "/api/review/" + editReview.id,
          { ...review, productId: productId, userId: user?.id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          let reviewsFiltered = reviews.filter(
            (review) => review.id !== editReview.id
          );
          setReviews([res.data, ...reviewsFiltered]);

          setRating(
            Math.round(
              (rating * totalReviews - editReview.rating + res.data.rating) /
                totalReviews
            )
          );
          setReview({ rating: 0, review: "" });
          toast("Review updated successfully");
          setEditReview(null);
        })
        .catch((err) => {
        console.log(err);
        });
    } else {
      axios
        .post(
          import.meta.env.VITE_API_URL + "/api/review",
          { ...review, productId: productId, userId: user?.id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);

          setRating(
            Math.round(
              (rating * totalReviews + res.data.rating) / (totalReviews + 1)
            )
          );
          setTotalReviews(totalReviews + 1);
          setReview({ rating: 0, review: "" });
          setReviews([res.data, ...reviews]);
          toast("Review created successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_API_URL + "/api/review", {
        params: {
          page: currentPage,
          size: 5,
          productId,
          userId: user?.id || -1,
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.totalPages == currentPage + 1) setShowMore(false);
        else setShowMore(true);
        if (currentPage == 0) setReviews(res.data.content);
        else setReviews([...reviews, ...res.data.content]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    if (editReview) {
      setReview({
        rating: editReview.rating,
        review: editReview.review,
      });
    }
  }, [editReview]);

  return (
    <div>
      <h2 className="my-10 text-center text-2xl font-bold">
        Reviews ({totalReviews})
      </h2>
      <div className="flex gap-20">
        <div className="w-3/5 flex flex-col gap-5">
          {reviews.length > 0 ? (
            <>
              {reviews.map((review, i) => {
                return (
                  <SingleReview
                    key={i}
                    review={review}
                    setTotalReviews={setTotalReviews}
                    totalReviews={totalReviews}
                    rating={rating}
                    setRating={setRating}
                    setEditReview={setEditReview}
                  />
                );
              })}
              {loading && (
                <div>
                  <SmallLoader />
                </div>
              )}
              {totalReviews > 5 && (
                <p
                  onClick={() => setCurrentPage(showMore ? currentPage + 1 : 0)}
                  className="my-3 text-[#808080] hover:text-[#FFCC00] font-semibold cursor-pointer"
                >
                  Show {showMore ? "More" : "Less"}
                </p>
              )}
            </>
          ) : (
            <p className="text-xl">No Reviews</p>
          )}
        </div>
        <div className="w-2/5">
          <form
            className="flex flex-col gap-10"
            onSubmit={(e) => manageReview(e)}
          >
            <div>
              <label>Your Rating</label>
              <div className="mt-1">{stars}</div>
            </div>
            <div>
              <label htmlFor="review">Your Review</label>
              <textarea
                id="review"
                className="resize-none outline-none border border-[#DFDFDF] h-40 w-full p-4 mt-2 rounded-lg focus:border focus:border-[#FFCC00]"
                value={review.review}
                onChange={(e) =>
                  setReview({ ...review, review: e.target.value })
                }
              ></textarea>
            </div>
            <button className="bg-[#FFCC00] font-bold w-fit px-8 py-4 text-sm rounded-lg uppercase cursor-pointer hover:scale-105">
              {editReview ? "Edit" : "Submit"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Reviews;
