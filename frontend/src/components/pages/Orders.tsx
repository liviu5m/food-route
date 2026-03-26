import { useEffect, useState } from "react";
import { useAppContext } from "../../../libs/AppContext";
import BodyLayout from "../layouts/BodyLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faStore, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import type { Order } from "../../../libs/Types";
import { Link, useLocation } from "react-router-dom";
import Loader from "../elements/Loader";
import Pagination from "../elements/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrdersFunc } from "../../api/order";

const Orders = () => {
  const { user } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const pageSize = 10;

  const { data: ordersData, isPending } = useQuery({
    queryKey: ["get-orders-data", currentPage],
    queryFn: () => getOrdersFunc(user?.id || -1, currentPage, pageSize),
  });

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData.content);
      setTotalPages(ordersData.totalPages);
    }
  }, [user, currentPage, ordersData]);

  return isPending ? (
    <Loader />
  ) : (
    <BodyLayout>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 flex items-center justify-center gap-3 sm:gap-5 text-2xl sm:text-3xl">
          <FontAwesomeIcon icon={faStore} />
          <h1 className="text-center font-bold">Orders</h1>
        </div>
        <div className="mb-10 min-h-[50vh]">
          {orders && orders.length == 0 ? (
            <div className="mt-16 sm:mt-20 flex flex-col items-center justify-center gap-3">
              <p className="text-lg font-bold">No Orders</p>
              <Link
                to="/products"
                className="min-h-11 w-fit rounded-lg bg-[#FFCC00] px-5 py-3 font-semibold text-white cursor-pointer lg:hover:scale-105 outline-none"
              >
                Return to Shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto overflow-y-visible hide-scrollbar px-0 sm:px-5">
              <table className="my-10 w-full min-w-[740px] md:min-w-[860px] table-auto border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                    <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">Id</th>
                    <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">Date</th>
                    <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">Shipping Address</th>
                    <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">Phone Number</th>
                    <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">Order Items</th>
                    <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">Total Price</th>
                    <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {orders.map((order, i) => {
                    return (
                      <tr
                        key={i}
                        className="even:bg-gray-200 bg-blue-50 transition"
                      >
                        <td className="p-2 sm:p-3 md:p-4 font-semibold whitespace-nowrap">{order.id}</td>
                        <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">{order.createdAt}</th>
                        <td className="p-2 sm:p-3 md:p-4 font-semibold">
                          {order.shippingAddress || (
                            <FontAwesomeIcon icon={faMinus} />
                          )}
                        </td>
                        <td className="p-2 sm:p-3 md:p-4 font-semibold whitespace-nowrap">
                          {order.phoneNumber || (
                            <FontAwesomeIcon icon={faMinus} />
                          )}
                        </td>
                        <td className="p-2 sm:p-3 md:p-4 font-semibold whitespace-nowrap">
                          {order.orderItemList.length > 0 ? (
                            <div>
                              <Link
                                to={`#item-${order.id}-0`}
                                className="btn"
                                onClick={() => {
                                  const dialog = document.getElementById(
                                    "order-" + order.id,
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
                                <div className="modal-box w-full sm:w-11/12 md:w-3/4 xl:w-1/2 max-w-5xl pt-5">
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
                                      },
                                    )}
                                  </div>
                                  <div className="flex w-full justify-center gap-2 py-2">
                                    {order.orderItemList.map(({}, i) => {
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
                                    })}
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
                        <th className="p-2 sm:p-3 md:p-4 whitespace-nowrap">
                          ${" "}
                          {order.orderItemList.reduce((sum, el) => {
                            return sum + el.product.price * el.quantity;
                          }, 0)}
                        </th>
                        <td
                          className={`p-2 sm:p-3 md:p-4 font-semibold whitespace-nowrap ${
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
