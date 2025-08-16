import { CheckCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../../libs/AppContext";
import Loader from "../elements/Loader";

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const [orderId, setOrderId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [isDataSet, setIsDataSet] = useState(false);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const saveCartProduct = (orderId: number) => {
    user?.cart.cartProducts.forEach((product) => {
      axios
        .post(
          import.meta.env.VITE_API_URL + "/api/order-item",
          {
            orderId,
            productId: product.product.id,
            quantity: product.quantity,
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
    });
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/cart-product", {
        params: {
          cartId: user?.cart.id,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        if (!user) return;
        console.log(res.data);
        let emptyCart = {
          ...user?.cart,
          cartProducts: [],
        };
        setUser({ ...user, cart: emptyCart });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateOrder = (orderId: number) => {
    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/order/" + orderId,
        {
          userId: user?.id,
          shippingAddress: user?.address || address,
          phoneNumber: user?.phoneNumber || phoneNumber,
          status: "SUCCESS",
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
        saveCartProduct(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    const sessionId = searchParams.get("session_id");
    const token = searchParams.get("token");
    const orderId = searchParams.get("orderId");
    setOrderId(Number(orderId));

    if (!sessionId || !token) {
      navigate("/cart");
      return;
    }

    axios
      .get(import.meta.env.VITE_API_URL + `/api/order/` + orderId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == "SUCCESS") {
          navigate("/orders");
        }
      })
      .catch((err) => {
        console.log(err);
      });

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
        setLoading(false);
        console.log(res.data);
        if (isDataSet) updateOrder(Number(orderId));
      })
      .catch((err) => {
        console.log(err);
        navigate("/cart");
      });
  }, [searchParams, navigate, user?.id, isDataSet]);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="text-green-500 mb-4">
            <CheckCircleIcon className="h-16 w-16" />
          </div>
          <h2 className="card-title text-2xl font-bold mb-2">
            Payment Successful!
          </h2>
          <p className="mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          <div className="space-y-4 w-full">
            <div className="stats bg-base-200 w-full">
              <div className="stat">
                <div className="stat-title">Order Number</div>
                <div className="stat-value text-lg">#{orderId}</div>
              </div>
            </div>
            {!isDataSet && (
              <div className="w-full flex flex-col gap-5 mt-5">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full outline-none bg-[#EEEEEE] rounded-lg px-4 py-2 text-[#222831]"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button
                  className="bg-[#00C950] font-semibold text-[#eee] px-4 py-2 rounded-lg w-full cursor-pointer hover:scale-105 outline-none"
                  onClick={() => setIsDataSet(true)}
                >
                  Save
                </button>
              </div>
            )}
            {isDataSet && (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <Link to="/orders" className="btn btn-primary flex-1">
                  View Orders
                </Link>
                <Link to="/products" className="btn btn-outline flex-1">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
