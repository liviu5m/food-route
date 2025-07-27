import React from "react";
import type { Review } from "../../../../libs/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEdit,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../../../../libs/AppContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const SingleReview = ({
  review,
  setTotalReviews,
  totalReviews,
  rating,
  setRating,
  setEditReview,
}: {
  review: Review;
  setTotalReviews: (e: number) => void;
  totalReviews: number;
  rating: number;
  setRating: (e: number) => void;
  setEditReview: (e: Review | null) => void;
}) => {
  const { user } = useAppContext();
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        className={review.rating >= i ? "text-[#FFCC00]" : "text-[#DFDFDF]"}
      />
    );
  }

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const deleteReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/review/" + review.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        toast("Review deleted successfully");
        button.closest("section")?.remove();
        setTotalReviews(totalReviews - 1);
        setRating(
          Math.round(
            (rating * totalReviews - review.rating) / (totalReviews - 1)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="flex gap-5 flex-1/2">
      <div className="w-16 shrink-0">
        <img
          className="w-16 h-16 aspect-square object-cover rounded-full"
          src="/imgs/user.png"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between w-full">
          <div>{stars}</div>
          <div>
            {review.user.id == user?.id && (
              <>
                <button
                  className="bg-blue-400 font-bold mr-5 w-fit text-white px-5 py-3 text-sm rounded-lg uppercase cursor-pointer hover:scale-105"
                  onClick={() => setEditReview(review)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="bg-red-400 font-bold w-fit text-white px-5 py-3 text-sm rounded-lg uppercase cursor-pointer hover:scale-105"
                  onClick={(e) => deleteReview(e)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-10 mt-2">
          <h1 className="text-lg">{review.user.fullName}</h1>
          <h3 className="text-[#808080] flex items-center justify-center gap-3 text-sm">
            <FontAwesomeIcon icon={faClock} />
            <span>{formatDate(review.createdAt)}</span>
          </h3>
        </div>
        <p className="text-[#808080] mt-4">{review.review}</p>
      </div>
      <ToastContainer />
    </section>
  );
};

export default SingleReview;
