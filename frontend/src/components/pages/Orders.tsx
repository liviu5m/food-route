import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../libs/AppContext";
import BodyLayout from "../layouts/bodyLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faStore, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import type { Order, OrderItem } from "../../../libs/Types";
import { Link, useLocation } from "react-router-dom";
import SingleOrder from "../elements/SingleOrder";
import Loader from "../elements/Loader";
import Pagination from "../elements/Pagination";

const Orders = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [showOrderItems, setShowOrderItems] = useState<OrderItem[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setLoading(true);
      axios
        .get(import.meta.env.VITE_API_URL + "/api/order/user", {
          params: {
            userId: user.id,
            page: currentPage,
            size: 10,
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setOrders(res.data.content);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user, currentPage]);

  return loading ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="container">
        <div className="flex items-center justify-center gap-5 text-3xl mt-10">
          <FontAwesomeIcon icon={faStore} />
          <h1 className="text-center font-bold">Orders</h1>
        </div>
        <div className="mb-10 min-h-[50vh]">
          {orders && orders.length == 0 ? (
            <div className="flex items-center justify-center flex-col gap-3 mt-20">
              <p className="text-lg font-bold">No Orders</p>
              <Link
                to="/products"
                className="bg-[#FFCC00] w-fit font-semibold text-white px-5 py-3 rounded-lg cursor-pointer hover:scale-105 outline-none"
              >
                Return to Shopping
              </Link>
            </div>
          ) : (
            <div>
              <table className="w-full table-auto border-collapse text-left my-10">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                    <th className="p-4">Id</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Shipping Address</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">Order Items</th>
                    <th className="p-4">Total Price</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {orders.map((order, i) => {
                    return (
                      <tr
                        key={i}
                        className="even:bg-gray-200 bg-blue-50 transition"
                      >
                        <td className="p-4 font-semibold">{order.id}</td>
                        <th className="p-4">{order.createdAt}</th>
                        <td className="p-4 font-semibold">
                          {order.shippingAddress || (
                            <FontAwesomeIcon icon={faMinus} />
                          )}
                        </td>
                        <td className="p-4 font-semibold">
                          {order.phoneNumber || (
                            <FontAwesomeIcon icon={faMinus} />
                          )}
                        </td>
                        <td
                          className="p-4 font-semibold"
                          onClick={() => setShowOrderItems(order.orderItemList)}
                        >
                          {order.orderItemList.length > 0 ? (
                            <div>
                              <Link
                                to={`#item-${order.id}-0`}
                                className="btn"
                                onClick={() => {
                                  const dialog = document.getElementById(
                                    "order-" + order.id
                                  ) as HTMLDialogElement | null;
                                  dialog?.showModal();
                                }}
                              >
                                Show
                              </Link>
                              <dialog
                                id={"order-" + order.id}
                                className="modal"
                              >
                                <div className="modal-box w-1/2 max-w-5xl pt-5">
                                  <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                      <FontAwesomeIcon icon={faX} />
                                    </button>
                                  </form>
                                  <div className="carousel w-full pt-5">
                                    {order.orderItemList.map(
                                      ({ product, quantity }, i) => {
                                        return (
                                          <div
                                            id={`item-${order.id}-${i}`}
                                            className="carousel-item w-full flex flex-col gap-5 text-white"
                                          >
                                            <img
                                              src={product.image}
                                              className="w-full"
                                            />
                                            <div className="flex items-center justify-between">
                                              <div>
                                                <h1 className="text-lg">
                                                  {product.name}
                                                </h1>
                                                <h4 className="text-sm text-[#808080]">
                                                  {product.category.name}
                                                </h4>
                                              </div>
                                              <div>
                                                <h1 className="text-lg">
                                                  ${product.price} x{" "}
                                                  <span className="text-[#808080]">
                                                    {quantity}
                                                  </span>
                                                </h1>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                  <div className="flex w-full justify-center gap-2 py-2">
                                    {order.orderItemList.map(
                                      ({ product }, i) => {
                                        return (
                                          <a
                                            href={`#item-${order.id}-${i}`}
                                            className={`btn btn-xs ${
                                              location.hash ==
                                              `#item-${order.id}-${i}`
                                                ? "bg-blue-400"
                                                : ""
                                            }`}
                                          >
                                            {i + 1}
                                          </a>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          ) : (
                            <div>
                              <FontAwesomeIcon icon={faMinus} />
                            </div>
                          )}
                        </td>
                        <th className="p-4">
                          ${" "}
                          {order.orderItemList.reduce((sum, el) => {
                            return sum + el.product.price * el.quantity;
                          }, 0)}
                        </th>
                        <td
                          className={`p-4 font-semibold ${
                            order.status == "SUCCESS"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {order.status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                client={true}
              />
            </div>
          )}
        </div>
      </div>
    </BodyLayout>
  );
};

export default Orders;
