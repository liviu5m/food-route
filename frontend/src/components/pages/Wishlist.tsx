import { useAppContext } from "../../../libs/AppContext";
import BodyLayout from "../layouts/BodyLayout";
import { Link } from "react-router-dom";
import { faBasketShopping, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartLoader from "../elements/CartLoader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearFavoriteFunc } from "../../api/favorite";

const Wishlist = () => {
  const { user, setUser, managedCart, manageFavorite, cartLoading } =
    useAppContext();
  const queryClient = useQueryClient();

  const { mutate: clearWishlist } = useMutation({
    mutationFn: () => clearFavoriteFunc(user?.id || -1),
    onSuccess: (data) => {
      console.log(data);
      toast("Wishlist cleared");
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <BodyLayout>
      <div className="flex w-full items-center justify-center">
        <div className="mx-auto my-20 min-h-[50vh] w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-2xl sm:text-3xl font-bold">Wishlist</h1>
          <div className="w-full">
            {user?.favorites.length == 0 ? (
              <div className="flex flex-col items-center justify-center">
                <h2 className="mt-5 text-center text-lg font-semibold">
                  No Favorites
                </h2>
                <Link
                  to={"/products"}
                  className="mt-5 min-h-11 min-w-[44px] rounded-lg bg-[#FFCC00] px-8 sm:px-10 py-4 text-[#1E1D23] lg:hover:bg-[#1E1D23] lg:hover:text-[#FFCC00]"
                >
                  Return to Shopping
                </Link>
              </div>
            ) : (
              <div className="overflow-y-scroll hide-scrollbar">
                <div className="my-10 flex w-full flex-col rounded-lg px-0 sm:px-5 text-left text-xs sm:text-sm">
                  {user?.favorites.map((favorite, i) => {
                    return (
                      <div
                        key={i}
                        className={`even:bg-gray-200 w-full bg-blue-50 transition flex flex-col lg:flex-row items-center justify-between ${
                          i == 0 && "rounded-t-2xl"
                        } ${i == user.favorites.length - 1 && "rounded-b-2xl"}`}
                      >
                        <div className="p-4 font-semibold">{favorite.id}</div>
                        <div className="p-4">
                          <img
                            className="w-40 h-20 object-cover"
                            src={favorite.product.image}
                          />
                        </div>
                        <div className="p-4 font-semibold">
                          {favorite.product.name}
                        </div>
                        <div className="p-4 font-semibold">
                          ${favorite.product.price}
                        </div>
                        <div className="p-4 font-semibold">
                          <button
                            className={`min-h-11 w-full sm:w-auto px-8 sm:px-16 lg:px-24 xl:px-40 h-14 rounded-lg text-sm flex items-center justify-center gap-4 font-semibold cursor-pointer ${
                              user?.cart.cartProducts.find(
                                (prod) =>
                                  prod.product.id == favorite.product.id,
                              )
                                ? "bg-[#1E1D23] text-[#FFCC00]"
                                : "bg-[#FFCC00] lg:hover:text-[#FFCC00] lg:hover:bg-[#1E1D23] text-[#1E1D23]"
                            }`}
                            onClick={() => {
                              let el = user?.cart.cartProducts.find(
                                (prod) =>
                                  prod.product.id == favorite.product.id,
                              );
                              managedCart(
                                favorite.product.id,
                                el ? String(el.id) : "add",
                                true,
                                1,
                              );
                            }}
                          >
                            {cartLoading == favorite.product.id ? (
                              <CartLoader />
                            ) : (
                              <FontAwesomeIcon icon={faBasketShopping} />
                            )}
                            {user?.cart.cartProducts.find(
                              (prod) => prod.product.id == favorite.product.id,
                            )
                              ? "In Cart"
                              : "Add to Cart"}
                          </button>
                        </div>
                        <div className="p-4">
                          <button
                            className="p-2 cursor-pointer transition-transform lg:hover:scale-110 lg:hover:rotate-180"
                            onClick={() => {
                              manageFavorite(favorite.product, "delete");
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faX}
                              className="text-[#FF0000] text-xl"
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="flex items-center justify-center mt-10"
                    onClick={() => clearWishlist()}
                  >
                    <button className="min-h-11 w-full sm:w-auto px-8 sm:px-16 lg:px-24 xl:px-40 h-14 rounded-lg text-sm flex items-center justify-center gap-4 font-semibold cursor-pointer bg-[#FFCC00] lg:hover:text-[#FFCC00] lg:hover:bg-[#1E1D23] text-[#1E1D23]">
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </BodyLayout>
  );
};

export default Wishlist;
