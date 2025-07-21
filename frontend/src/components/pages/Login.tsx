import React from "react";
import BodyLayout from "../layouts/bodyLayout";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAppContext } from "../../../libs/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const { getUser } = useAppContext();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    let email = e.currentTarget.email.value;
    e.preventDefault();
    axios
      .post(`http://localhost:8080/auth/login`, {
        email,
        password: e.currentTarget.password.value,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("jwtToken", res.data.token);
        getUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.data ==
          "Account not verified, please verify your account"
        ) {
          axios.post("http://localhost:8080/auth/resend");
          navigate("/auth/verify?email=" + email);
        }
        if (Array.isArray(err.response.data)) {
          toast(
            <div>
              {err.response.data.map((msg: string, i: number) => (
                <div key={i}>{msg}</div>
              ))}
            </div>
          );
        } else toast(err.response.data);
      });
  };

  const handleGoogleLogin = () => {
    window.location.href =
      import.meta.env.VITE_API_URL + "/oauth2/authorization/google";
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#222831]">
      <Link to="/" className="absolute top-5 left-5">
        <h1 className="flex gap-3 items-center justify-center p-2">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
        </h1>
      </Link>
      <div className="w-[400px]">
        <h1 className="font-bold text-2xl text-center mb-10">Log In</h1>
        <form className="flex flex-col gap-5" onSubmit={(e) => login(e)}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
          />
          <button className="px-8 py-3 bg-[#eee] text-[#00ADB5] cursor-pointer rounded-lg font-semibold hover:text-[#eee] hover:bg-[#00ADB5]">
            Log In
          </button>
        </form>
        <div className="relative my-7">
          <hr />
          <h2 className="px-3 bg-[#222831] absolute left-1/2 -translate-1/2 top-1/2 ">
            Or
          </h2>
        </div>
        <button
          onClick={() => handleGoogleLogin()}
          className="px-8 py-3 bg-[#00ADB5] text-[#eee] cursor-pointer rounded-lg font-semibold hover:text-[#00ADB5] hover:bg-[#eee] flex items-center justify-center gap-7 w-full mt-5"
        >
          <img src="/imgs/google.png" className="w-6" alt="" />
          <h3>Google</h3>
        </button>
        <p className="text-center mt-5">
          Don't have an account ?{" "}
          <Link to="/auth/signup" className="text-[#00ADB5]">
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
