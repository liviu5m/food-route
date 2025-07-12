import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";

type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  address: string;
  phoneNumber: string;
};

const Header = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data) setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        setLoading(false);
      });
  }, []);
  console.log(loading);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-between py-8">
      <div className="flex items-center justify-center gap-5">
        <img className="w-8" src="./imgs/logo.png" alt="" />
        <h2 className="text-3xl font-bold text-[#00ADB5]">FoodRoute</h2>
      </div>
      <ul className="flex items-center justify-center gap-10">
        <Link
          to="/"
          className={`hover:text-[#00ADB5] ${
            pathname == "/" && "text-[#00ADB5]"
          }`}
        >
          Home
        </Link>
        <Link
          to="/products"
          className={`hover:text-[#00ADB5] ${
            pathname == "/products" && "text-[#00ADB5]"
          }`}
        >
          Products
        </Link>
        <Link
          to="/services"
          className={`hover:text-[#00ADB5] ${
            pathname == "/services" && "text-[#00ADB5]"
          }`}
        >
          Services
        </Link>
        <Link
          to="/contact"
          className={`hover:text-[#00ADB5] ${
            pathname == "/contact" && "text-[#00ADB5]"
          }`}
        >
          Contact
        </Link>
      </ul>
      <div className="flex items-center justify-center gap-10">
        {user ? (
          <Link
            to="/account"
            className="px-8 py-3 bg-[#00ADB5] text-[#eee] rounded-lg font-semibold hover:text-[#00ADB5] hover:bg-[#eee]"
          >
            {user.username}
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="px-8 py-3 bg-[#00ADB5] text-[#eee] rounded-lg font-semibold hover:text-[#00ADB5] hover:bg-[#eee]"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-8 py-3 bg-[#eee] text-[#00ADB5] rounded-lg font-semibold hover:text-[#eee] hover:bg-[#00ADB5]"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
