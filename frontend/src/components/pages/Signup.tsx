import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(import.meta.env.VITE_API_URL+`/auth/signup`, {
        fullName: e.currentTarget.fullName.value,
        username: e.currentTarget.username.value,
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        passwordConfirmation: e.currentTarget.passwordConfirmation.value,
        address: e.currentTarget.address.value,
        phoneNumber: e.currentTarget.phoneNumber.value,
      })
      .then((res) => {
        console.log(res.data);
        navigate("/auth/verify?email=" + res.data.email);
      })
      .catch((err) => {
        console.log(err);

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

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#222831]">
      <Link to="/" className="absolute top-5 left-5">
        <h1 className="flex gap-3 items-center justify-center p-2">
          <FontAwesomeIcon icon={faArrowLeft} /> <span>Back</span>
        </h1>
      </Link>
      <div className="w-[400px]">
        <h1 className="font-bold text-2xl text-center mb-10">Sign Up</h1>
        <form className="flex flex-col gap-5" onSubmit={(e) => signUp(e)}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
          />
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
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className="px-6 py-3 rounded-lg bg-[#00ADB5] outline-none text-[#eee] placeholder:text-gray-300"
          />
          <button className="px-8 py-3 bg-[#eee] text-[#00ADB5] cursor-pointer rounded-lg font-semibold hover:text-[#eee] hover:bg-[#00ADB5]">
            Sign Up
          </button>
        </form>
        <div className="relative my-7">
          <hr />
          <h2 className="px-3 bg-[#222831] absolute left-1/2 -translate-1/2 top-1/2 ">
            Or
          </h2>
        </div>
        <button className="px-8 py-3 bg-[#00ADB5] text-[#eee] cursor-pointer rounded-lg font-semibold hover:text-[#00ADB5] hover:bg-[#eee] flex items-center justify-center gap-7 w-full mt-5">
          <img src="/imgs/google.png" className="w-6" alt="" />
          <h3>Google</h3>
        </button>
        <p className="text-center mt-5">
          Already have an account ?{" "}
          <Link to="/auth/login" className="text-[#00ADB5]">
            Log In
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
