import { useAppContext } from "../../../libs/AppContext";
import BodyLayout from "../layouts/BodyLayout";
import { Link } from "react-router-dom";
import { faBasketShopping, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartLoader from "../elements/CartLoader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Wishlist = () => {
  const { user, setUser, managedCart, manageFavorite, cartLoading } =
    useAppContext();

  const clearWishlist = () => {
    axios
      .delete(import.meta.env.VITE_API_URL + "/api/favorite/all", {
        params: {
          userId: user?.id,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        if (user) setUser({ ...user, favorites: [] });
        toast("Wishlist cleared");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BodyLayout>
      <div className="flex items-center justify-center w-full">
        <div className="container my-20 min-h-[50vh] w-full">
          <h1 className="text-3xl text-center font-bold">Wishlist</h1>
          <div className="w-full">
            {user?.favorites.length == 0 ? (
              <div className="flex items-center justify-center flex-col">
                <h2 className="text-center text-lg font-semibold mt-5">
                  No Favorites
                </h2>
                <Link
                  to={"/products"}
                  className="px-10 py-4 rounded-lg mt-5 bg-[#FFCC00] text-[#1E1D23] hover:bg-[#1E1D23] hover:text-[#FFCC00]"
                >
                  Return to Shopping
                </Link>
              </div>
            ) : (
              <div className="overflow-y-scroll hide-scrollbar">
                <div className="text-sm lg:scale-100 w-full text-left my-10 flex flex-col rounded-lg px-5">
                  {user?.favorites.map((favorite, i) => {
                    return (
                      <div
                        key={i}
                        className={`even:bg-gray-200 w-full bg-blue-50 transition flex items-center justify-between ${
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
                            className={`px-40 h-14 rounded-lg text-sm flex items-center justify-center gap-4 font-semibold cursor-pointer ${
                              user?.cart.cartProducts.find(
                                (prod) => prod.product.id == favorite.product.id
                              )
                                ? "bg-[#1E1D23] text-[#FFCC00]"
                                : "bg-[#FFCC00] hover:text-[#FFCC00] hover:bg-[#1E1D23] text-[#1E1D23]"
                            }`}
                            onClick={() => {
                              let el = user?.cart.cartProducts.find(
                                (prod) => prod.product.id == favorite.product.id
                              );
                              managedCart(
                                favorite.product.id,
                                el ? String(el.id) : "add",
                                true,
                                1
                              );
                            }}
                          >
                            {cartLoading == favorite.product.id ? (
                              <CartLoader />
                            ) : (
                              <FontAwesomeIcon icon={faBasketShopping} />
                            )}
                            {user?.cart.cartProducts.find(
                              (prod) => prod.product.id == favorite.product.id
                            )
                              ? "In Cart"
                              : "Add to Cart"}
                          </button>
                        </div>
                        <div className="p-4">
                          <button
                            className="p-2 hover:scale-110 hover:rotate-180 cursor-pointer"
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
                    <button className="px-40 h-14 rounded-lg text-sm flex items-center justify-center gap-4 font-semibold cursor-pointer bg-[#FFCC00] hover:text-[#FFCC00] hover:bg-[#1E1D23] text-[#1E1D23]">
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
