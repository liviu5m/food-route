import axios from "axios";
import React, { useState } from "react";
import CartLoader from "../CartLoader";
import { useAppContext } from "../../../../libs/AppContext";

const StripePayment = ({ amount }: { amount: number }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAppContext();

  const checkout = () => {
    setLoading(true);
    axios
      .post(
        import.meta.env.VITE_API_URL + "/api/payment/checkout",
        {
          amount: amount * 100,
          quantity: 1,
          name: "FoodRoute Cart Checkout",
          currency: "USD",
          userId: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data.sessionUrl;
        localStorage.setItem("sessionId", res.data.sessionId);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={() => checkout()}
        className="btn px-10 py-3 rounded-lg bg-[#FFCC00] text-[#1E1D23] hover:bg-[#1E1D23] hover:text-[#FFCC00] font-semibold cursor-pointer mb-10 flex items-center justify-center gap-2"
      >
        {loading && (
          <div className="scale-50 hidden md:block">
            <CartLoader />
          </div>
        )}
        Checkout
      </button>
    </div>
  );
};

export default StripePayment;
