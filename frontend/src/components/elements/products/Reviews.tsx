import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../../libs/AppContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import type { Review } from "../../../../libs/Types";
import SingleReview from "./SingleReview";
import SmallLoader from "../SmallLoader";
import type { Dispatch, SetStateAction } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createReviewFunc,
  getReviewsPaginated,
  updateReviewById,
} from "../../../api/review";

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
  const queryClient = useQueryClient();

  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={`${
          review.rating >= i ? "text-[#FFCC00]" : "text-[#DFDFDF]"
        } cursor-pointer`}
        onClick={() =>
          setReview({ ...review, rating: i == review.rating ? 0 : i })
        }
      />,
    );
  }

  const { mutate: updateReview } = useMutation({
    mutationKey: ["update-review"],
    mutationFn: () =>
      updateReviewById(editReview?.id || -1, {
        ...review,
        productId: productId,
        userId: user?.id,
      }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["get-reviews-paginated"] });
      queryClient.invalidateQueries({ queryKey: ["get-reviews"] });
      toast("Review updated successfully");
      setEditReview(null);
      setReview({ rating: 0, review: "" });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: createReview } = useMutation({
    mutationKey: ["create-review"],
    mutationFn: () =>
      createReviewFunc({ ...review, productId: productId, userId: user?.id }),
    onSuccess: (data) => {
      console.log(data);
      setReview({ rating: 0, review: "" });
      toast("Review created successfully");
      queryClient.invalidateQueries({ queryKey: ["get-reviews-paginated"] });
      queryClient.invalidateQueries({ queryKey: ["get-reviews"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: reviewsData } = useQuery({
    queryKey: ["get-reviews-paginated", productId],
    queryFn: () =>
      getReviewsPaginated({
        page: currentPage,
        size: 5,
        productId,
        userId: user?.id || -1,
      }),
  });

  const manageReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) navigate("/auth/login");
    if (editReview) updateReview();
    else createReview();
  };

  useEffect(() => {
    if (reviewsData) {
      if (reviewsData.totalPages == currentPage + 1) setShowMore(false);
      else setShowMore(true);
      if (currentPage == 0) setReviews(reviewsData.content);
      else setReviews([...reviews, ...reviewsData.content]);
      setLoading(false);
    }
  }, [currentPage, reviewsData]);

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
      <h2 className="my-8 sm:my-10 text-center text-xl sm:text-2xl font-bold">
        Reviews ({totalReviews})
      </h2>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-20">
        <div className="w-full lg:w-3/5 flex flex-col gap-5">
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
                  className="my-3 text-[#808080] font-semibold cursor-pointer lg:hover:text-[#FFCC00]"
                >
                  Show {showMore ? "More" : "Less"}
                </p>
              )}
            </>
          ) : (
            <p className="text-lg sm:text-xl">No Reviews</p>
          )}
        </div>
        <div className="w-full lg:w-2/5">
          <form
            className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
            onSubmit={(e) => manageReview(e)}
          >
            <div>
              <label>Your Rating</label>
              <div className="mt-1 flex items-center gap-1 sm:gap-2 text-lg sm:text-xl">{stars}</div>
            </div>
            <div>
              <label htmlFor="review">Your Review</label>
              <textarea
                id="review"
                className="mt-2 h-32 sm:h-40 w-full resize-none rounded-lg border border-[#DFDFDF] p-3 sm:p-4 outline-none focus:border focus:border-[#FFCC00]"
                value={review.review}
                onChange={(e) =>
                  setReview({ ...review, review: e.target.value })
                }
              ></textarea>
            </div>
            <button className="min-h-11 w-full sm:w-fit rounded-lg bg-[#FFCC00] px-8 py-3 sm:py-4 text-sm font-bold uppercase cursor-pointer lg:hover:scale-105">
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
