import { XCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../../libs/AppContext";

export default function FailedPayment() {
  const { user } = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = () => {
      const sessionId = searchParams.get("session_id");
      const token = searchParams.get("token");
      const orderId = searchParams.get("orderId");

      if (!sessionId || !token) {
        navigate("/cart");
        return;
      }
      axios
        .get(
          import.meta.env.VITE_API_URL +
            `/api/payment/verify?session_id=${sessionId}&token=${token}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          axios
            .put(
              import.meta.env.VITE_API_URL + `/api/order/${orderId}`,
              {
                status: "CANCELED",
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
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="text-red-500 mb-4">
            <XCircleIcon className="h-16 w-16" />
          </div>
          <h2 className="card-title text-2xl font-bold mb-2">
            Payment Cancelled
          </h2>
          <p className="mb-6">
            Your payment was not completed. No charges have been applied.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Link to="/cart" className="btn btn-primary flex-1">
              Return to Cart
            </Link>
            <Link to="/products" className="btn btn-outline flex-1">
              Continue Shopping
            </Link>
          </div>

          <p className="text-sm mt-4 text-base-content/70">
            Need help?{" "}
            <a href="#" className="link link-primary">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
